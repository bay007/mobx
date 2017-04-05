import {extendObservable,computed,action/*,autorun*/} from 'mobx';

class CounterStore{
	
	constructor(x=0){
		
		extendObservable(this,{
			contador_o:x,	/* some observable state */
						//Cualquier valor que pueda mutar y sirva como recurso para ‘pintar’ nuestra interface es un valor
						//MobX puede hacer que casi todos los tipos de valores como objetos, arrays, clases, primitivas, etc, puedan ser observados.
									
			/* a derived value  Con esto se refiere a cualquier valor que pueda ser derivado de otros valores observables*/
			iva_c:computed(()=>{return this.contador_o * 0.16}),
			//iva:computed(()=>this.contador * 0.16) //es equivalente, notese los corchetes y el return
			
			changeSubTotal_a: action.bound(function(s) { //Note: don't use action.bind with arrow functions; arrow functions are already bound and cannot be rebound.
				this.contador_o=s; // bound 'this'
			}),
			
			addOne2SubTotal_a:action.bound(function(){ //Note: don't use action.bind with arrow functions; arrow functions are already bound and cannot be rebound.
				this.contador_o++;
			}),
			
			addTwo2SubTotal_a:action.bound(function(){ //Note: don't use action.bind with arrow functions; arrow functions are already bound and cannot be rebound.
				this.contador_o+=2;
			}),
			
			log:function(){ //no se propone como accion ya que no modifica el "estado"
				console.log(this.contador_o);
			}
		})
	}
}

/*Para motivos de debug en la consola
var c=new CounterStore();
autorun(() => console.log(c.iva));

c.changeSubTotal(10);
c.changeSubTotal(15);
c.changeSubTotal(120);
*/
export default CounterStore