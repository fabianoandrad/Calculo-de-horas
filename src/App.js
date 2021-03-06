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

    
// Tratativas de erros
if(valueHourIn == '' || valueMinIn == '' || valueHourOut == '' || valueMinOut == ''){
  return alert('Todos os campos são obrigatórios!')
  
}else if(valueHourIn > 24 || valueHourOut > 24){
  return alert('Hora de entrada ou saída não pode ser maior que 24hrs')

}else if(valueHourIn < 0 || valueHourOut < 0){
  return alert('Hora de entrada ou saída não pode ser menor que 00')

}else if(valueMinIn < 0 || valueMinOut < 0){
  return alert('Minuto de entrada ou saída não pode ser menor que 00')

}

    // Envia os dados para o back-end
    const response = await api.post("projects", {
      hourIn: valueHourIn,
      minIn: valueMinIn,

      hourOut: valueHourOut,
      minOut: valueMinOut,
    });
    console.log(response.data);
    const project = response.data;

    setCalculateHours([...calculateHours, project]);

  }

  async function handleReset(){
    setCalculateHours([])
    await api.post("projects", {del: true});
  }

  return (
    <>
      <Header title="Cálcular Horas" />

     
        <h4>Digite a Hora de entrada</h4>
        <label> Hora <input id="hourIn" type="number" min="0" max="23" name="HourIn"  /></label>
        <label> Minuto <input id="minIn" type="number" min="0" max="59" name="MinIn" /></label>
        <h4>Digite a Hora de saída</h4>
        <label> Hora <input id="hourOut" type="number" min="0" max="23" name="HourOut" /></label>
        <label> Minuto <input id="minOut" type="number" min="0" max="59" name="MinOut" /></label>

        <h4></h4>

      <button type="button" onClick={handleAddHours}>
        Cálcular horas
      </button>
     <span> </span>
      <button type="button" onClick={handleReset}>
        Resetar valores
      </button>

      <h4>Resulatdo:</h4>


      <ul>
        {calculateHours.map((hours) => (
          <li key={hours.id}>
            {hours.valueHourDiurno}:{hours.valueMinDiurno} {hours.DiurnoResult}
            e {hours.valueHourNoturno}:{hours.valueMinNoturno}
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
