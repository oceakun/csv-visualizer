import React, { useState, useEffect } from 'react'
import "./QueryContainer.css";

export default function QueryContainer() {

  const [queryCount, setQueryCount] = useState([1, 2, 6, 4, 5, 6, 6]);
  const [queryObjects, setQueryObjects] = useState({ 0: { "field": '', "type": '' }, 1: { "field": '', "type": '' }, 2: { "field": '', "type": '' }, 3: { "field": '', "type": '' } });

  useEffect(() => {
    console.log("useEffect, queryObjects : ", queryObjects);
  }, [queryObjects]);

  const addQuery = () => {
    console.log("query added");
    const queryObjectsLength = Object.keys(queryObjects).length;
    setQueryObjects({ ...queryObjects, queryObjectsLength: { "field": '', "type": '' } });
  }

  const delQuery = (i) => {
    setQueryObjects((queryCount) => queryCount.splice(i, 1));
  }

  const setQueryType = (type, q) => {
    queryObjects[q]["type"] = type;
  }

  const setQueryField = (field, q) => {
    queryObjects[q]["field"] = field;
  }

  return (
    <div id="outerContainer">
    <div id="allQueries">
      <span id="queryHeader">
        <h3>Queries</h3>
        <button className="icon"
          onClick={addQuery}
        >+</button>
      </span>

      {
        Object.keys(queryObjects).map((q) => {
          return (
            <span key={q} className="singleQuery">
              <p>Field</p>
              <input
                value={queryObjects[q]["field"]}
                onChange={(event) => setQueryField(event.target.value, q)}
                type="text" name="field" id="field" />
              <p>Type</p>
              <select
                value={queryObjects[q]["type"]}
                onChange={(event) => setQueryType(event.target.value, q)}
                name="type" id="type">
                <option value="string">String</option>
                <option value="number">Number</option>
                <option value="boolean">Boolean</option>
              </select>
              <button className="icon"
              // onClick={delQuery(q)}
              >-</button>
            </span>
          )
        })
      }
      <span>
        <button id="buildPanel">Build Panel</button>
      </span>

    </div>
    </div>
  )
}
