import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Chart } from "react-google-charts";

function App() {
  const [rangeData, setRD] = useState([
    [50, 30],
    [120, 23],
  ]);
  const [headshotData, setHD] = useState(1.4);
  const [torsomultiplier, setTM] = useState(1);
  const [limbMultiplier, setLM] = useState(1);

  const rtcpy = [...rangeData];
  const vt = rtcpy.sort((a, b) => a[0] - b[0]);
  vt.push([vt[vt.length - 1][0] + 20, vt[vt.length - 1][1]]);
  vt.unshift([0, vt[0][1]]);
  let md = 0;
  let mid = Infinity;
  vt.map((v) => {
    if (v[1] > md) {
      md = v[1];
    }
    if (v[1] < mid) {
      mid = v[1];
    }
  });

  const gGraphOptions = {
    title: "Damage range Graph",
    hAxis: {
      title: "Range (studs)",
      viewWindow: { min: 0, max: vt[vt.length - 1][0] },
    },
    vAxis: { title: "Damage", viewWindow: { min: mid - 5, max: md + 5 } },
    chartArea: {
      backgroundColor: {
        fill: "#000000",
      },
    },
    series: {
      0: { color: "#ff0000" },
    },
    legend: "none",
    tooltip: {
      isHtml: false,
    },
  };
  console.log(vt);
  function updateRangeData(
    index: number,
    value: number,
    type: "range" | "damage"
  ) {
    const temp = [...rangeData];
    if (type === "range") {
      temp[index][0] = value;
    } else {
      temp[index][1] = value;
    }
    setRD(temp);
  }

  return (
    <main className="p-10 flex flex-col gap-5">
      <p className="text-2xl font-bold">PF Damage Range Claculator</p>
      <p>Fill in all the forms and everything will auto update</p>
      <Label htmlFor="headshot">Headshot Multiplier</Label>
      <Input
        type="number"
        id="headshot"
        value={headshotData}
        onChange={(e) => {
          setHD(parseFloat(e.target.value));
        }}
      />
      <Label htmlFor="torso">Torso Multiplier</Label>
      <Input
        type="number"
        id="torso"
        value={torsomultiplier}
        onChange={(e) => {
          setTM(parseFloat(e.target.value));
        }}
      />
      <Label htmlFor="limb">Limb Multiplier</Label>
      <Input
        type="number"
        id="limb"
        value={limbMultiplier}
        onChange={(e) => {
          setLM(parseFloat(e.target.value));
        }}
      />
      <div className="flex flex-col gap-5">
        <Button
          variant={"secondary"}
          className="w-min"
          onClick={() => {
            setRD([...rangeData, [0, 0]]);
          }}
        >
          Add Range
        </Button>
        {rangeData.map((range, index) => {
          return (
            <div
              key={`DmgRange-${index}`}
              className="flex flex-col gap-3 border-solid border-2 rounded-md p-3"
            >
              {index > 1 ? (
                <div className="flex flex-row justify-between">
                  <p className="font-bold">Stop {index + 1}</p>
                  <X
                    className="cursor-pointer"
                    onClick={() => {
                      const temp = [...rangeData];
                      temp.splice(index, 1);
                      setRD(temp);
                    }}
                  />
                </div>
              ) : (
                ""
              )}

              <div>
                <Label htmlFor={`range-${index}`}>Range (Studs)</Label>
                <Input
                  type="number"
                  id={`range-${index}`}
                  value={range[0]}
                  onChange={(e) => {
                    updateRangeData(index, parseInt(e.target.value), "range");
                  }}
                />
                <Label htmlFor={`damage-${index}`}>Damage</Label>
                <Input
                  type="number"
                  id={`damage-${index}`}
                  value={range[1]}
                  onChange={(e) => {
                    updateRangeData(index, parseInt(e.target.value), "damage");
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-2x">Torso Stats</p>
          <br />
          <p>min Hit to kill:</p>
        </div>
      </div>
      <Chart
        chartType="LineChart"
        data={[["range", "damage"], ...rtcpy]}
        options={gGraphOptions}
      />
    </main>
  );
}

export default App;
