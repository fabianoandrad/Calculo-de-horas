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
    // Envia os dados para o back-end
    const response = await api.post("projects", {
      hourIn:  '14',
      minIn:   '13',
      hourOut: '21',
      minOut:  '44',
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

      <button type="button" onClick={handleAddHours}>Cálcular horas</button>
      <ul>
        {calculateHours.map((hours) => (

          <li key={hours.id}>{hours.valueHourDiurno}:{hours.valueMinDiurno} {hours.DiurnoResult} e {hours.valueHourNoturno}:{hours.valueMinNoturno} {hours.NoturnoResult}</li>
          
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
