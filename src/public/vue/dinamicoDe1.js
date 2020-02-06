const app=new Vue({
	el: '#imagenesProd',
	data:{
		imagProd:[
		'https://i.ibb.co/fpBTWXX/SYSPRO-erp-1-1.png',
		'https://i.ibb.co/S0n49XG/escolar-1.png',
		'https://i.ibb.co/wg5LZgq/feature-accounting-software-desktop-5-1.png'
		],
		descr:'Con ALPWINSQL Usted Obtendrá MAYOR CONTROL, MAYOR PRODUCTIVIDAD, MAYORES BENEFICIOS, En menos tiempo, con un sistema de Gestión Empresarial que se adapta a su empresa y su forma de trabajo, es un sistema Multi-usuario, Multi -empresa, Parametrizable. Usted dispone de la información de su empresa en tiempo real y con un mayor control de la actividad basada en la obtención de datos reales.'
	}
})

const detail=new Vue({
	el: '#fila',
	data:{
		det:[
		{titulo:'Contabilidad',
		desc:['Estado Situación Financiera','Estado Resultado Integral','Plan De Cuentas','Mayor Contable','Presupuesto']
		},

		{titulo:'Bancos',
		desc:['Movimiento Bancario Por Beneficiario','Listado De Cheques Postfechados','Conciliacion Bancaria','Listado De Retenciones','Estado De Cuenta']
		},

		{titulo:'Anexos Internacionales',
		desc:['Exportar Anexos A Excel','Anexo De Exportacion','Generador De Xml Al Dimm','Anexo De Compras','Anexo De Ventas']
		},

		{titulo:'Ventas',
		desc:['Estado De Cuenta Por Cliente','Listado De Recaudación','Kardex Con Costo','Costo De Ventas','Facturación']
		},

		{titulo:'Cuentas por pagar',
		desc:['Ingreso De Compras Proveedores','Estado De Cuenta Por Proveedor','Kardex De Articulos Con Costo','Listado De Pagos','Importaciones']
		},

		{titulo:'Inventario',
		desc:['Transferencias Entre Bodegas','Maestro De Productos','Ingreso De Materiales','Salida De Materiales','Kardex De Articulos']
		}
		]
	}
})