var hoteles = [];

$(document).ready(function(){

    fechas_formulario();
    refresca_num_hab();
    autocomplete_hotel();

    $('#buscar_x_hotel').click(function() {
        $('#tipo_busqueda').val('X_HOTEL');
        activa_tipo();
    });

    $('#buscar_x_zona').click(function() {
        $('#tipo_busqueda').val('X_ZONA');
        activa_tipo();
    });
    activa_tipo();


    // Codigo de promocion
    $('#cod_prom').click(function(){
        $(this).val('');
    }).blur(function(){
        if ($(this).val() == '') {
            $(this).val($('#codigo_pro').val());
            $('#codigo_promocional').val('');            
        } else {
            $('#codigo_promocional').val($(this).val());
        }
    });

    if ( $('#cod_prom').val() == "") {
        $('#cod_prom').val($('#codigo_pro').val());
    }

    $("#input_codigo").hide();						   
    $("#check_codigo").click(function(){
        if($(this).attr('checked')) {
	    $("#input_codigo").show();
	} else {
	    $("#input_codigo").hide();
	}
    });

    // Hotel
    $('#nombre_hotel').click(function(){
        $(this).val('');
    }).blur(function(){
        if ($(this).val() == '') {
            $(this).val($('#nombre_hotel_txt').val());
            $('#id_hotel').val('');
        }
    });

    if ($('#nombre_hotel').val() == '') {
        $('#nombre_hotel').val($('#nombre_hotel_txt').val());
    }
    

    // Si tenemos provincia, la seleccionamos.
    var cod_prov = $('#provincia_select').val();
    if (cod_prov != '') {
        $('#selector_hijo').val(cod_prov);
    }


    

});

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
        $('#nombre_hotel').hide();
        $('#selector_padre').show();
        $('#selector_hijo').show();

        var obj_li = $('#buscar_x_hotel').parent();
        $(obj_li).removeClass();

        var obj_li_zona = $('#buscar_x_zona').parent();
        $(obj_li_zona).addClass('tab_active');
    } else if ($('#tipo_busqueda').val() == 'X_HOTEL') {
        $('#nombre_hotel').show();
        $('#selector_padre').hide();
        $('#selector_hijo').hide();

        var obj_li = $('#buscar_x_hotel').parent();
        $(obj_li).addClass('tab_active');

        var obj_li_zona = $('#buscar_x_zona').parent();
        $(obj_li_zona).removeClass();
    }
}

function borrar_combo(combo) {
    $('#' + combo + ' option').remove();
}

function fechas_formulario(solapa) {
    var hoy = new Date();
    var maximo_noches = $('#maximo_noches').val();

    // Fecha de entrada
    if ($('#fecha_entrada').val() == "") {
        $('#fecha_entrada').val(formatear_fecha(hoy));
    }
	
	$("#calendario_entrada").click(function(){
        $("#fecha_entrada").trigger("focus");
    });
	$("#calendario_salida").click(function(){
        $("#fecha_salida").trigger("focus");
    });
    
    $('#fecha_entrada').datepicker({
        //showOn: 'button',
        //buttonImage: '/CLIENTES/'+$('#carpeta_cliente').val()+'/imagenes_plantillas/calendar.jpg',
        //buttonImageOnly: true,
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
        //showOn: 'button',
        //buttonImage: '/CLIENTES/'+$('#carpeta_cliente').val()+'/imagenes_plantillas/calendar.jpg',
        //buttonImageOnly: true,
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

    $('div.filas_habitaciones').fadeTo(0,1);
    $('div.filas_habitaciones .select_petit').removeAttr('disabled');
    for(var i=3; i>num_hab;i--) {
        //Miramos si existe el div a ocultar....
        if($('div#fila_hab_' + i ).length != 0)
        {
                $('div#fila_hab_' + i ).fadeTo('fast',0.2);
                $('div#fila_hab_' + i + ' .select_petit').attr({
                    "disabled":"disabled"
                });
        }
    }
}

function autocomplete_hotel() {
    $('#nombre_hotel').autocomplete({
        minLength: 2,
        source: hoteles,
        focus: function(event, ui) {
            $('#nombre_hotel').val(ui.item.label);
            return false;
        },
        select: function(event, ui) {
            $('#nombre_hotel').val(ui.item.label);

            var valor = ui.item.value;
            valor = valor.split('@');
            $('#id_hotel').val(valor[0]);
            return false;
        }
    });
}

function ejecuta_buscar() {
    var hay_errores = false;
    
    if ($('#tipo_busqueda').val() == 'X_ZONA') {
        var pais = $('#selector_padre option:selected').val();
        var provincia = $('#selector_hijo option:selected').val();

        if (pais == 0 || provincia == 'undefined' || provincia == 0) {
            jAlert($('#error_rellenar_combos').val(), "Atención");
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
            jAlert($('#error_no_hotel').val(), "Atención");
        }
    }

    if (hay_errores == false) {
        $('#formulario_buscador').submit();
    }
    
    
}
