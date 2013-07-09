var hoteles = [];

$(document).ready(function(){
    fechas_formulario();
    refresca_num_hab();

    //autocompleteGeolocalizacion();

    /*$('#buscar_x_zona').click(function() {
        $('#tipo_busqueda').val('X_ZONA');
        activa_tipo();
    });

    $('#buscar_x_loquesea').click(function() {
        $('#tipo_busqueda').val('X_LOQUESEA');
        activa_tipo();
    });
    activa_tipo();    
	
    if ($('#nombre_ciudad').val() == '') {
        $('#nombre_ciudad').val($('#text_interior_input_destino').val());
    }
	
    $('#nombre_ciudad').click(function(){
        $(this).val('');
        $('#longitud').val('');
        $('#latitud').val('');
    }).blur(function(){
        if ($(this).val() == '') {
            $('#nombre_ciudad').val($('#text_interior_input_destino').val());
        }
    });
    

    // Si tenemos provincia, la seleccionamos.
    var cod_prov = $('#provincia_select').val();
    if (cod_prov != '') {
        $('#selector_hijo').val(cod_prov);
    }

    $('#barra_cambio_radio_titulo').hide();
    if (($('#barra_cambio_radio').length == 0) && ($('#tipo_busqueda').val() == 'X_LOQUESEA')) {
        $('#barra_cambio_radio_form').slider({
            min: parseInt($('#kilometros_minimo').val()),
            max: parseInt($('#kilometros_maximo').val()),
            value: parseInt($('#kilometros').val()),
            step: 1,
            slide: function(event, ui) {
                $('#kilometros').val(ui.value);
                $('#kilometros_span_form').html(ui.value);
            }
        });
        $('#kilometros_span_form').show();
        $('#barra_cambio_radio_titulo').show();
    }*/

    colocacionCmbHab();
});


/**
 * Configuración autocomplete de
 */
/*function autocompleteGeolocalizacion() {
    $('#nombre_ciudad').autocomplete(hoteles,{
        matchContains: true,
        formatItem: function(item) {
            var res = item.toString().split("@");
			
            if (res[0].substring(0,1) == '*') {
                var result = res[0].substring(1);
            } else if (res[0].substring(0,1) == '-') {
                var result = res[0].substring(1);
            } else {
                var result = res[0];
            }
            return result;
        },
        buscarEnGoogle:false,
        prefijoData: 'HOTEL '
    }).result(function(event, data, formatted){
        if (data)
        {
            var res = data.toString().split("@");
            if ((res[0].substring(0,1) == '*') || (res[0].substring(0,1) == '-')) {
                $('#nombre_ciudad').val(res[0].substring(1));
                $('#tipo_busqueda').val('X_LOQUESEA');
                $('#id_hotel').val('');
                $('#longitud').val(res[2]);
                $('#latitud').val(res[3]);
				
                //alert('longitud: ' + res[2] + ' -- latitud: ' + res[3]);
                $('#descripcion_provincia').val(res[1]);

            } else {

                $('#nombre_ciudad').val(res[0]);
                $('#tipo_busqueda').val('X_LOQUESEA');
                $('#id_hotel').val(res[1]);
                $('#longitud').val(res[2]);
                $('#latitud').val(res[3]);

                $('#descripcion_provincia').val(res[0]);
            }

        }
    });

}*/
/**
 * Desactivamos Intro
 */
function desactiva_intro(event, objecto) {
    if (event.keyCode == 13) {
        return false;
    }
}

function activa_tipo() {
    if ($('#tipo_busqueda').val() == 'X_ZONA') {
        //        $('#nombre_hotel').hide();
        $('#selector_padre').show();
        $('#selector_hijo').show();

        //        var obj_li = $('#buscar_x_hotel').parent();
        //        $(obj_li).removeClass();
        var obj_li_zona = $('#buscar_x_zona').parent();
        $(obj_li_zona).addClass('tab_active');
        var obj_li_zona = $('#buscar_x_loquesea').parent();
        $(obj_li_zona).removeClass();
		
        $('#selector_ciudad').hide();
        $('#nombre_ciudad').hide();
        $('#ayuda_buscar_por_radio').hide();
        $('#barra_cambio_radio_form').hide();
        $('#kilometros_span_form').hide();
        $('#barra_cambio_radio_titulo').hide();
		
    } else if (($('#tipo_busqueda').val() == 'X_LOQUESEA')
        || ($('#tipo_busqueda').val() == 'X_HOTEL')) {

        //		var obj_li = $('#buscar_x_hotel').parent();
        //        $(obj_li).removeClass();
        var obj_li_zona = $('#buscar_x_zona').parent();
        $(obj_li_zona).removeClass();
        var obj_li_zona = $('#buscar_x_loquesea').parent();
        $(obj_li_zona).addClass('tab_active');

        //		$('#nombre_hotel').hide();
        $('#selector_padre').hide();
        $('#selector_hijo').hide();
        $('#selector_ciudad').show();
        $('#nombre_ciudad').show();
        $('#ayuda_buscar_por_radio').show();
		
        if (($('#barra_cambio_radio').length == 0) && ($('#tipo_busqueda').val() == 'X_LOQUESEA')) {
            $('#kilometros_span_form').show();
            $('#barra_cambio_radio_form').show();
            $('#barra_cambio_radio_titulo').show();
        }
		
    }
}

function borrar_combo(combo) {
    $('#' + combo + ' option').remove();
}


/*
jQuery(function($){
	$.datepicker.regional['es'] = {
		clearText: 'Borra',
		clearStatus: 'Borra fecha actual',
		closeText: 'Cerrar',
		closeStatus: 'Cerrar sin guardar',
		prevText: '<Ant',
		prevBigText: '<<',
		prevStatus: 'Mostrar mes anterior',
		prevBigStatus: 'Mostrar año anterior',
		nextText: 'Sig>',
		nextBigText: '>>',
		nextStatus: 'Mostrar mes siguiente',
		nextBigStatus: 'Mostrar año siguiente',
		currentText: 'Hoy',
		currentStatus: 'Mostrar mes actual',
		monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
		monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
		monthStatus: 'Seleccionar otro mes',
		yearStatus: 'Seleccionar otro año',
		weekHeader: 'Sm',
		weekStatus: 'Semana del año',
		dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
		dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
		dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
		dayStatus: 'Set DD as first week day',
		dateStatus: 'Select D, M d',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		initStatus: 'Seleccionar fecha',
		isRTL: false
	};
	$.datepicker.setDefaults($.datepicker.regional['es']);
});
*/


function fechas_formulario(solapa) {
    var hoy = new Date();
    var maximo_noches = $('#maximo_noches').val();

    // Fecha de entrada
    if ($('#fecha_entrada').val() == "") {
        $('#fecha_entrada').val(formatear_fecha(hoy));
    }
    
    $('#fecha_entrada').datepicker({
        showOn: 'button',
        buttonImage: '/CLIENTES/'+$('#carpeta_cliente').val()+'/imagenes_plantillas/calendar.jpg',
        buttonImageOnly: true,
        buttonText: $('#seleccione_fecha_llegada').val(),
        dateFormat:'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange:'+0:+2',
        minDate: '+0',
        maxDate: '+2y+1m',
        showButtonPanel: true,
        firstDay: 1,
        onSelect: function(dateText, inst) {
            dateText = dateText.split('/');
            var nuevaFecha = new Date(dateText[2], (dateText[1]-1), dateText[0]);
            var manana = sumar_noches(nuevaFecha, 1);
            $('#fecha_salida').val(formatear_fecha(manana));
            $('#fecha_salida').datepicker('option','minDate',nuevaFecha);
            $('#total_noches').html('1');
        }
    });

    // Fecha de salida
    var manana = sumar_noches(hoy, 1);
    var fecha_salida_anterior;
    

    if ($('#fecha_salida').val() == "") {
        $('#fecha_salida').val(formatear_fecha(manana));
    }
    $('#fecha_salida').datepicker({
        showOn: 'button',
        buttonImage: '/CLIENTES/'+$('#carpeta_cliente').val()+'/imagenes_plantillas/calendar.jpg',
        buttonImageOnly: true,
        buttonText: $('#seleccione_fecha_salida').val(),
        dateFormat:'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange:'+0:+2',
        minDate: '+1',
        maxDate: '+2y+1m',
        showButtonPanel: true,
        firstDay: 1,
        onSelect: function(dateText,inst) {
            var num_noches = calcula_noches($('#fecha_entrada').val(), dateText);
            if (num_noches <= maximo_noches) {
                $('#total_noches').html(num_noches);
            } else {
                jAlert($('#error_maximo_noches').val());
                $('#fecha_salida').val(fecha_salida_anterior);
            }
            
        },
        beforeShow: function(input, inst) {
            fecha_salida_anterior = input.value;
        }
    });

    var num_noches = calcula_noches($('#fecha_entrada').val(), $('#fecha_salida').val());
    $('#total_noches').html(num_noches);
}

function sumar_noches(fecha, noches) {
    var cont = 1;
    while ((noches >= cont) && (cont<365) )
    {
        fecha.setTime(fecha.getTime() + (86400000) );
        if(fecha.getHours() == 1 ) fecha.setTime(fecha.getTime() - 3600000 );
        else if( fecha.getHours() == 23 ) fecha.setTime(fecha.getTime() + 3600000 );

        cont++;
    }

    return fecha;
}

function calcula_noches(fecha_ini, fecha_final)
{
    var fecha_ini = new String(fecha_ini);
    fecha_ini = fecha_ini.split('/');
    cadena = fecha_ini[2] + "/" + fecha_ini[1] + "/" + fecha_ini[0];
    fecha_ini = new Date(cadena);

    var fecha_fin = new String(fecha_final);
    fecha_fin = fecha_fin.split('/');
    cadena = fecha_fin[2] + "/" + fecha_fin[1] + "/" + fecha_fin[0];
    fecha_fin = new Date(cadena);

    diferencia = new Date();
    if (fecha_fin.getTime() < fecha_ini.getTime()) fecha_fin.setTime(fecha_ini.getTime());
    diferencia.setTime(fecha_fin.getTime()-fecha_ini.getTime());

    var dif = Math.round(diferencia.getTime()/86400000);

    return dif;
}


function formatear_fecha(fecha) {
    return zero_delante(fecha.getDate()) + '/' + zero_delante((fecha.getMonth()+1)) + '/' + fecha.getFullYear()
}

function zero_delante(valor) {
    var cadena = new String(valor);

    if (cadena.length == 1) {
        return '0' + cadena;
    } else {
        return cadena;
    }
}

function refresca_num_hab() {
    var num_hab = $('#num_habitaciones option:selected').val();
	
    $('div .filas_habitaciones').fadeTo(0,1);
    $('div .filas_habitaciones .select_petit').removeAttr('disabled');
    for(var i=3; i>num_hab;i--) {
        $('div#fila_hab_' + i ).fadeTo('fast',0.2);
        $('div#fila_hab_' + i + ' .select_petit').attr({
            "disabled":"disabled"
        });
    }

}

/**
 * Colocación combos habitaciones
 */
function colocacionCmbHab() {
    $('.selector_habitaciones:first').show();
    $('.selector_habitaciones:gt(0)').remove();
    $('.texto_indicador_hab:first').remove();
}



function ejecuta_buscar() {
    var hay_errores = false;
    
    if ($('#tipo_busqueda').val() == 'X_ZONA') {
        var pais = $('#selector_padre option:selected').val();
        var provincia = $('#selector_hijo option:selected').val();

        if (pais == 0 || provincia == 'undefined' || provincia == 0) {
            jAlert($('#error_rellenar_combos').val(), $('#atencion').val());
            hay_errores = true;
        } else {
            $('#pais').val(pais);
            $('#provincia').val(provincia);
            $('#descripcion_provincia').val($('#selector_hijo option:selected').text());
        }

    } else if ($('#tipo_busqueda').val() == 'X_HOTEL') {
        var id_hotel = $('#id_hotel').val();

        if (id_hotel == '') {
            hay_errores = true;
            jAlert($('#error_no_hotel').val(), $('#atencion').val());
        }
    }else if ($('#tipo_busqueda').val() == 'X_LOQUESEA') {
        if (($('#longitud').val() == "") || ($('#latitud').val() == "")) {
            hay_errores = true;
            jAlert($('#error_no_ciudad').val(), $('#atencion').val());
        }
    }

    if (hay_errores == false) {
        $('#formulario_buscador').submit();
    }
    
    
}

/**
 * Ventana de Ayuda
 */
function ayuda_pi() {
    var capa_ayuda_pi = $('#capa_ayuda_pi');
    $(capa_ayuda_pi).show();

}

/**
* A partir de un texto pasado, realizamos una búsqueda al GeoCoder de Google
* y si tenemos respuesta, la colocamos al formulario del buscador
*/
function busca_destino(text) {
    var geocoder = new GClientGeocoder();
    geocoder.getLocations(text, function(response) {
        if (response.Status.code == 200) {
            var lugar = response.Placemark[0].address;
			
            try {
                var ciudad = response.Placemark[i].AddressDetails.Country.AdministrativeArea.SubAdministrativeArea.Locality.LocalityName;
            } catch (exception) {
                var ciudad = lugar;
            }
			
            var longitud = response.Placemark[0].Point.coordinates[0];
            var latitud = response.Placemark[0].Point.coordinates[1];
			
            $('#longitud').val(longitud);
            $('#latitud').val(latitud);
            $('#nombre_ciudad').val(ciudad);
            $('#id_hotel').val('');
			
        }
    });
}






						   
	$(document).ready(function(){	
							   
	$("#codigo_promocion").hide();						   
			
 $("#check_codigo").click( function (){
											  
											  
											  
				$("#codigo_promocion").slideToggle(400);					  
											  
											  
											  
											  
											  
											  
											  });

});	
