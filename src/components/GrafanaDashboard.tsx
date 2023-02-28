import React from 'react'
import { BarGauge, BarGaugeDisplayMode } from '@grafana/ui';
import { VizOrientation, ThresholdsMode, Field, FieldType, getDisplayProcessor ,  GrafanaTheme2} from '@grafana/data';

function GrafanaDashboard() {
  // const minValue = 0;
  // const maxValue = 20;
  // const threshold1Value = 5;
  // const threshold2Value = 10;
  // const threshold1Color = "red";
  // const threshold2Color = "blue";
  // const theme = {
  //   name: "mytheme",
  //   isDark: false,
  //   isLight: true,
  // } as GrafanaTheme2;

  // const field: Partial<Field> = {
  //   type: FieldType.number,
  //   config: {
  //     min: minValue,
  //     max: maxValue,
  //     thresholds: {
  //       mode: ThresholdsMode.Absolute,
  //       steps: [
  //         { value: -Infinity, color: "green" },
  //         { value: threshold1Value, color: threshold1Color },
  //         { value: threshold2Value, color: threshold2Color },
  //       ],
  //     },
  //   },
  // };
  // field.display = getDisplayProcessor({ field, theme });

  // const value = { text: '100', numeric: 100 }

  return (
    <div>
      {/* <BarGauge
      value={value}
      field={field.config}
      display={field.display}
      orientation={VizOrientation.Vertical}
      displayMode={BarGaugeDisplayMode.Basic}
      /> */}
    </div>
  )
}

export default GrafanaDashboard
