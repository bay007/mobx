import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CounterStore from './CounterStore' //importamos el Store hecha clase
import {observer} from 'mobx-react';  //The observer function / decorator can be used to turn ReactJS components into reactive components.
import DevTools from 'mobx-react-devtools'; //para debugging

class App extends Component {
	
	constructor(){
		super()
		this.counterStore=new CounterStore(); //declaramos una instancia del store
		this.cambiarValorA0=this.cambiarValorA0.bind(this);
		this.cambiarValorEn1=this.cambiarValorEn1.bind(this);
	}
	
	cambiarValorA0=()=>{
		console.log("Befor fired,"+this.counterStore.iva_c);
		this.counterStore.changeSubTotal_a(0);
		console.log("After change fired,"+this.counterStore.iva_c);
	}
	
	cambiarValorEn1=()=>{
		/*
		When to use actions?

		Actions should only be used on functions that modify state. Functions that just perform look-ups,
		filters etc should not be marked as actions; to allow MobX to track their invocations.
		*/
		
		this.counterStore.addOne2SubTotal_a();//Deacuerdo a la doc, esta accion modifica el estado por lo que una accion debe ser ejecutada
		//this.counterStore.contador_o++; //esto no estaria bien que se implementara
		this.counterStore.log(); //dado que no modifica el estado no se ejecuta como accion
	}
	
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to React</h1>
		  
        </div>
        <div className="App-intro">
		<p>Componente "App"</p>
			<code>Esta linea no cambia por que no se ha declarado como observador el componente que la contiene</code>
			<p>Impuestos: {this.counterStore.contador_o} + IVA:${this.counterStore.iva_c}</p>
			<button onClick={this.cambiarValorEn1}>Fire componente 1! plus 1</button>
			<button onClick={this.cambiarValorA0}>Fire componente 1! To 0</button>
		</div>

		<Tablero counterStore={this.counterStore}/> { /*Este atributo esta sobrado, el componente no lo usará*/ }
		<DevTools />
		
      </div>
    );
  }
}

class Tablero extends Component{
	
	constructor(props){
		super(props);
		this.counterStore=new CounterStore();//asi hacemos que se cada componente tenga su propio Store
		this.cambiarValorA0=this.cambiarValorA0.bind(this);
		this.cambiarValorEn2=this.cambiarValorEn2.bind(this);
	}
	
	cambiarValorA0=()=>{
		console.log("Befor fired,"+this.counterStore.iva_c);
		this.counterStore.changeSubTotal_a(0);
		console.log("After change fired,"+this.counterStore.iva_c);
	}
	
	cambiarValorEn2=()=>{
		/*
		When to use actions?

		Actions should only be used on functions that modify state. Functions that just perform look-ups,
		filters etc should not be marked as actions; to allow MobX to track their invocations.
		*/
		
		this.counterStore.addTwo2SubTotal_a();//Deacuerdo a la doc, esta accion modifica el estado por lo que una accion debe ser ejecutada
	}
	
	render(){
		return(<div>
			<hr/>
			<p>Componente "Tablero"</p>
			<code>Esta linea SI cambia por que su componente que la contiene fue declarado como observador</code>
			<p className="App-Tablero">Impuestos: ${this.counterStore.contador_o} + IVA:${this.counterStore.iva_c}</p>
			<button onClick={this.cambiarValorEn2}>Fire componente 2! plus 2</button>
			<button onClick={this.cambiarValorA0}>Fire Componente 2! To 0</button>
		</div>)
	}
}

observer(Tablero); //dejamos como observador el Tablero ya que ahi es donde se Mutará la VISTA
export default observer(App); //Se declara como Observador ya que se requiere que Muten algunas partes del componente
