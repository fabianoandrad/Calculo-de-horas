import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import api from "./services/api";

function App() {
  const [calculateHours, setCalculateHours] = useState([]);

  // Obtem os dados calculados do back-end
  useEffect(() => {
    api.get("projects").then((response) => {
      setCalculateHours(response.data);
      //console.log(response)
    });
  }, []);
  

  async function handleAddHours() {

    const valueHourIn = document.getElementById('hourIn').value
    const valueMinIn = document.getElementById('minIn').value
    const valueHourOut = document.getElementById('hourOut').value
    const valueMinOut = document.getElementById('minOut').value

    


    // Envia os dados para o back-end
    const response = await api.post("projects", {
      hourIn: valueHourIn,
      minIn: valueMinIn,

      hourOut: valueHourOut,
      minOut: valueMinOut,
    });

    const project = response.data;

    setCalculateHours([...calculateHours, project]);

    //calculateHours.push('23:55')
    //setCalculateHours([...calculateHours, ` Nova hora ${Date.now()}`] )
    //console.log(calculateHours)
  }

  return (
    <>
      <Header title="Cálcular Horas" />

     
        <h4>Digite a Hora de entrada</h4>
        <label> Hora <input id="hourIn" type="number" min="0" max="23" name="HourIn"  /></label>:
        <label> Minuto <input id="minIn" type="number" min="0" max="59" name="MinIn" /></label>
        <h4>Digite a Hora de saída</h4>
        <label> Hora <input id="hourOut" type="number" min="0" max="23" name="HourOut" /></label>:
        <label> Minuto <input id="minOut" type="number" min="0" max="60" name="MinOut" /></label>

        <h4></h4>

      <button type="button" onClick={handleAddHours}>
        Cálcular horas
      </button>

      <h4>Resulatdo</h4>


      <ul>
        {calculateHours.map((hours) => (
          <li key={hours.id}>
            {hours.valueHourDiurno}:{hours.valueMinDiurno} {hours.DiurnoResult}{" "}
            e {hours.valueHourNoturno}:{hours.valueMinNoturno}{" "}
            {hours.NoturnoResult}
          </li>
        ))}
      </ul>
    </>
  );
}
export default App;

//yarn webpack serve --mode development

// Enviar a hora de entrada e saida
// Calcular quantas horas diurnas e noturnas
// Enviar ao front-end quantas horas trabalhadas diurnas e noturnas
// Enviar ao front-end o total das horas

//pra achar a soma das horas subtrai hora entrada com hora saida
