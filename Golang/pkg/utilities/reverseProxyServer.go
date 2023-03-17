package utilities

import (
	"net/http"

	"net/http/httputil"

	"net/url"

	"fmt"

	"bytes"

	"github.com/spf13/viper"

	"log"

	"encoding/json"

	"io/ioutil"

	"strings"

	"errors"
)

type requestPayloadStruct struct {
	ProxyCondition string `json:"proxy_condition"`
}

// Get a json decoder for a given requests body
func RequestBodyDecoder(request *http.Request) *json.Decoder {
	// Read body to buffer
	body, err := ioutil.ReadAll(request.Body)
	if err != nil {
		log.Printf("Error reading body: %v", err)
		panic(err)
	}
	request.Body = ioutil.NopCloser(bytes.NewBuffer(body))

	return json.NewDecoder(ioutil.NopCloser(bytes.NewBuffer(body)))
}

// Parse the requests body
func ParseRequestBody(request *http.Request) requestPayloadStruct {
	decoder := RequestBodyDecoder(request)

	var requestPayload requestPayloadStruct
	err := decoder.Decode(&requestPayload)

	if err != nil {
		panic(err)
	}

	return requestPayload
}

// Log the typeform payload and redirect url
func LogRequestPayload(requestionPayload requestPayloadStruct, proxyUrl string) {
	log.Printf("proxy_condition: %s, proxy_url: %s\n", requestionPayload.ProxyCondition, proxyUrl)
}

// Get the url for a given proxy condition
func GetProxyUrl(proxyConditionRaw string) string {
	proxyCondition := strings.ToUpper(proxyConditionRaw)

	a_condtion_url := viper.Get("A_CONDITION_URL")
	b_condtion_url := viper.Get("B_CONDITION_URL")
	default_condtion_url := viper.Get("DEFAULT_CONDITION_URL")

	if proxyCondition == "A" {
		return a_condtion_url.(string)
	}

	if proxyCondition == "B" {
		return b_condtion_url.(string)
	}

	return default_condtion_url.(string)
}

// NewProxy takes target host and creates a reverse proxy
func NewProxy(targetHost string) (*httputil.ReverseProxy, error) {
    url, err := url.Parse(targetHost)
    if err != nil {
        return nil, err
    }
 
    proxy := httputil.NewSingleHostReverseProxy(url)
 
    originalDirector := proxy.Director
    proxy.Director = func(req *http.Request) {
        originalDirector(req)
        ModifyRequest(req)
    }
 
    proxy.ModifyResponse = ModifyResponse()
    proxy.ErrorHandler = ErrorHandler()
    return proxy, nil
}

func ModifyRequest(req *http.Request) {
    req.Header.Set("X-Proxy", "Simple-Reverse-Proxy")
}
 
func ErrorHandler() func(http.ResponseWriter, *http.Request, error) {
    return func(w http.ResponseWriter, req *http.Request, err error) {
        fmt.Printf("Got error while modifying response: %v \n", err)
        return
    }
}
 
func ModifyResponse() func(*http.Response) error {
    return func(resp *http.Response) error {
        return errors.New("response body is invalid")
    }
}
 

// Serve a reverse proxy for a given url
func ServeReverseProxy(target string, res http.ResponseWriter, req *http.Request) {
	// parse the url
	url, _ := url.Parse(target)

	// create the reverse proxy
	proxy := httputil.NewSingleHostReverseProxy(url)

	// Update the headers to allow for SSL redirection
	req.URL.Host = url.Host
	req.URL.Scheme = url.Scheme
	req.Header.Set("X-Forwarded-Host", req.Header.Get("Host"))
	req.Host = url.Host

	// Note that ServeHttp is non blocking and uses a go routine under the hood
	proxy.ServeHTTP(res, req)
}

// Given a request send it to the appropriate url
func HandleRequestAndRedirect(res http.ResponseWriter, req *http.Request) {
	requestPayload := ParseRequestBody(req)
	url := GetProxyUrl(requestPayload.ProxyCondition)
	LogRequestPayload(requestPayload, url)
	ServeReverseProxy(url, res, req)
}
