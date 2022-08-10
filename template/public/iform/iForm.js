var iForm = function (SpaceSelector, ArrayForm, Options) {
    this.makeid = function (limit) {
        if (!limit) {
            limit = 10;
        }
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz_0123456789";
        for (var i = 0; i < limit; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };
    this.HTML_ID = this.makeid(10);
    this.Space = SpaceSelector;
    this.ObjArray = ArrayForm;
    this.options = Options;
    this.selectors = [];
    this.drawForm = function () {
        var el = this;
        var options = el.options;
        var colorRange = '#4CAF50';
        $('head').append('<style> .form-control-file {  width: 100%; height: 39px;  padding: 6px 12px;  background-color: #fff;  border: 1px solid #ccc; border-radius: 4px;  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075); -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;   transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s; }  label { font-weight: 700; display: inline-block;margin-bottom: 5px; } .form-control-error {  border-color: #D0021B; }   .form-text-error { color: #D0021B; }   </style>');
        if (options.colorRange && options.colorRange !== '') {
            colorRange = options.colorRange;
        }
        $('head').append('<style>.slider{-webkit-appearance: none; width: 100%; height: 15px; border-radius: 5px; background: #d3d3d3; outline: none; opacity: 0.7; -webkit-transition: .2s; transition: opacity .2s;}.slider:hover{opacity: 1;}.slider::-webkit-slider-thumb{-webkit-appearance: none; appearance: none; width: 25px; height: 25px; border-radius: 50%; background: ' + colorRange + '; cursor: pointer;}.slider::-moz-range-thumb{width: 25px; height: 25px; border-radius: 50%; background: ' + colorRange + '; cursor: pointer;}</style>');


        var classs = '';
        var action = '';
        var method = '';
        var enctype = '';

        if (options.formClass && options.formClass !== '') {
            classs = options.formClass;
        }
        if (options.action && options.action !== '') {
            action = options.action;
        }
        if (options.formMethod && options.formMethod !== '') {
            method = options.formMethod;
        }
        if (options.enctype && options.enctype !== '') {
            enctype = options.enctype;
        }
        var CadForm = '<form action="' + action + '" id="' + el.HTML_ID + '" enctype="' + enctype + '" class="' + classs + '" method="' + method + '">  </form>';
        $(this.Space).html(CadForm);
        $.each(el.ObjArray, function (i, item) {
            if (item.type) {

                var separator = '';
                var elHTML_ID = el.makeid(7);
                el.ObjArray[i].lx_cm = elHTML_ID;
                el.selectors.push($('[lx_cm=' + elHTML_ID + ']'));
                var elClass = '';
                var elId = '';
                var elStyle = '';
                var elAtrib = '';
                var elLabel = '';
                var elAst = '';
                var elName = '';
                var elPlaceholder = '';
                var tooltip = '';

                if (item.tooltip && item.tooltip !== '') {
                    tooltip = '<span id="_tooltip' + item.lx_cm + '_" data-alignment="top" data-tooltip data-position="left" title="' + item.tooltip + '" ><i class="fa fa-fw fa-map-pin"></i></span>';
                }
                if (item.placeholder && item.placeholder !== '') {
                    elPlaceholder = item.placeholder;
                }
                if (item.class && item.class !== '') {
                    elClass = item.class;
                }
                if (item.name && item.name !== '') {
                    elName = item.name;
                }
                if (item.id && item.id !== '') {
                    elId = item.id;
                }
                if (item.style && item.style !== '') {
                    elStyle = item.style;
                }
                if (item.attrib && item.attrib !== '') {
                    elAtrib = item.attrib;
                }
                if (item.label && item.label !== '') {
                    elLabel = item.label;
                }
                if (el.options.separator && el.options.separator !== '') {
                    separator = el.options.separator;
                }
                if (eval(item.mandatory)) {
                    elAst = '<span style="white-space:nowrap !important;"  id="' + elHTML_ID + '_Ast"> * </span>';
                }

                switch (item.type) {
                    /*Input type color*/
                    case 'range':
                        var min = 0, max = 100;
                        if (item.min) {
                            min = item.min;
                        }
                        if (item.max) {
                            max = item.max;
                        }
                        $('#' + el.HTML_ID).append(separator + '<label class="form-text"> ' + elLabel + elAst + ': ' + tooltip + ' </label><br>' +
                            '<input max="' + max + '" min="' + min + '" lx_cm="' + elHTML_ID + '" type="range"  name="' + elName + '" id="' + elId + '" class=" slider ' + elClass + '" style="' + elStyle + '"  ' + elAtrib + ' >' +
                            '<small id="' + elHTML_ID + '_mini" style="display: none;" class="form-text form-text-error" >Verifica la informaci&oacute;n</small>'
                        );
                        break;
                    /*Input type color*/
                    case 'color':
                        $('#' + el.HTML_ID).append(separator + '<label class="form-text"> ' + elLabel + elAst + ': ' + tooltip + ' </label><br>' +
                            '<input lx_cm="' + elHTML_ID + '" type="color"  name="' + elName + '" id="' + elId + '" class="' + elClass + '" style=" width: 50px; ' + elStyle + '"  ' + elAtrib + ' >' +
                            '<small id="' + elHTML_ID + '_mini" style="display: none;" class="form-text form-text-error" >Verifica la informaci&oacute;n</small>'
                        );
                        break;
                    case 'time':
                        $('#' + el.HTML_ID).append(separator + '<label class="form-text"> ' + elLabel + elAst + ': ' + tooltip + ' </label><br>' +
                            '<input lx_cm="' + elHTML_ID + '" type="time"  name="' + elName + '" id="' + elId + '" class="' + elClass + '" style="' + elStyle + '"  ' + elAtrib + ' >' +
                            '<small id="' + elHTML_ID + '_mini" style="display: none;" class="form-text form-text-error" >Verifica la informaci&oacute;n</small>'
                        );
                        break;
                    /*Input type date*/
                    case 'date':
                        $('#' + el.HTML_ID).append(separator + '<label class="form-text"> ' + elLabel + elAst + ': ' + tooltip + ' </label><br>' +
                            '<input lx_cm="' + elHTML_ID + '" type="date"  name="' + elName + '" id="' + elId + '" class="' + elClass + '" style="' + elStyle + '"  ' + elAtrib + ' >' +
                            '<small id="' + elHTML_ID + '_mini" style="display: none;" class="form-text form-text-error" >Verifica la informaci&oacute;n</small>'
                        );
                        break;
                    /*Input type file*/
                    case 'file':
                        var accept = '';
                        if (item.accept && item.accept !== '') {
                            accept = item.accept;
                        }
                        $('#' + el.HTML_ID).append(separator + '<label class="form-text"> ' + elLabel + elAst + ': ' + tooltip + ' </label><br>' +
                            '<input lx_cm="' + elHTML_ID + '" type="file" accept="' + accept + '" name="' + elName + '" id="' + elId + '" class="' + elClass + '" style="' + elStyle + '"  ' + elAtrib + ' >' +
                            '<small id="' + elHTML_ID + '_mini" style="display: none;" class="form-text form-text-error" >Verifica la informaci&oacute;n</small>'
                        );
                        break;
                    /*Input type text*/
                    case 'text':
                        var maxlength = '';
                        if (item.maxLength && item.maxLength !== '') {
                            maxlength = item.maxLength;
                        }
                        $('#' + el.HTML_ID).append(separator + '<label class="form-text"> ' + elLabel + elAst + ': ' + tooltip + ' </label><br>' +
                            '<input lx_cm="' + elHTML_ID + '" type="text" placeholder="' + elPlaceholder + '" maxlength="' + maxlength + '" name="' + elName + '" id="' + elId + '" class="' + elClass + '" style="' + elStyle + '"  ' + elAtrib + ' >' +
                            '<small id="' + elHTML_ID + '_mini" style="display: none;" class="form-text form-text-error" >Verifica la informaci&oacute;n</small>'
                        );
                        break;
                    /*Input type text*/
                    case 'email':
                        $('#' + el.HTML_ID).append(separator + '<label class="form-text"> ' + elLabel + elAst + ': ' + tooltip + ' </label><br>' +
                            '<input lx_cm="' + elHTML_ID + '" type="email" placeholder="' + elPlaceholder + '" maxlength="' + maxlength + '" name="' + elName + '" id="' + elId + '" class="' + elClass + '" style="' + elStyle + '"  ' + elAtrib + ' >' +
                            '<small id="' + elHTML_ID + '_mini" style="display: none;" class="form-text form-text-error" >Verifica la informaci&oacute;n</small>'
                        );
                        break;
                    /*Input type text*/
                    case 'textarea':
                        var maxlength = '';
                        if (item.maxLength && item.maxLength !== '') {
                            maxlength = item.maxLength;
                        }
                        var rows = '';
                        if (item.rows && item.rows !== '') {
                            rows = item.rows;
                        }
                        $('#' + el.HTML_ID).append(separator + '<label class="form-text"> ' + elLabel + elAst + ': ' + tooltip + ' </label><br>' +
                            '<textarea lx_cm="' + elHTML_ID + '" placeholder="' + elPlaceholder + '" rows="' + rows + '" type="text" maxlength="' + maxlength + '" name="' + elName + '" id="' + elId + '" class="' + elClass + '" style="' + elStyle + '"  ' + elAtrib + ' >' +
                            '</textarea>' +
                            '<small id="' + elHTML_ID + '_mini" style="display: none;" class="form-text form-text-error" >Verifica la informaci&oacute;n</small>'
                        );
                        break;
                    /*Input type text*/
                    case 'select':
                        var textSelect = 'Select an item ...';
                        if (el.options.textForSelect) {
                            textSelect = el.options.textForSelect;
                        }
                        $('#' + el.HTML_ID).append(separator + '<label class="form-text"> ' + elLabel + elAst + ': ' + tooltip + ' </label><br>' +
                            '<select lx_cm="' + elHTML_ID + '" type="text" name="' + elName + '" id="' + elId + '" class="' + elClass + '" style="' + elStyle + '"  ' + elAtrib + ' > ' +
                            '<option value="-1"> ' + textSelect + '</option>' +
                            '</select>' +
                            '<small id="' + elHTML_ID + '_mini" style="display: none;" class="form-text form-text-error" >Verifica la informaci&oacute;n</small>'
                        );


                        if (item.items) {

                            $.each(item.items, function (j, jtem) {
                                var value = j + 1;
                                if (jtem.value && jtem.value !== '') {
                                    value = jtem.value;
                                }

                                $('[lx_cm="' + elHTML_ID + '"]').append('<option value="' + value + '" >' + jtem.text + '</option>');
                            });
                        }


                        break;
                    /*Input type radio*/
                    case 'radio':

                        $('#' + el.HTML_ID).append(separator + '<label class="form-text"> ' + elLabel + elAst + ': ' + tooltip + ' </label><br>' +
                            '<div lx_cm="' + elHTML_ID + '"    class="' + elClass + '" style="' + elStyle + '"  ' + elAtrib + ' > ' +
                            '</div>' +
                            '<small id="' + elHTML_ID + '_mini" style="display: none;" class="form-text form-text-error" >Verifica la informaci&oacute;n</small>'
                        );
                        if (item.items) {
                            $.each(item.items, function (j, jtem) {
                                var value = j + 1;
                                var id = el.makeid(12);
                                if (jtem.id && jtem.id) {
                                    id = jtem.id;
                                }
                                if (jtem.value && jtem.value !== '') {
                                    value = jtem.value;
                                }
                                var sep = '';
                                if (item.itemSepartor) {
                                    sep = item.itemSepartor;
                                }
                                $('[lx_cm="' + elHTML_ID + '"]').append(sep + '<input id="' + id + '" type="radio" name="' + item.name + '" value="' + value + '" checked=""> ' + jtem.text);
                            });
                        }
                        break;
                    /*Input type checkbox*/
                    case 'checkbox':

                        $('#' + el.HTML_ID).append(separator + '<label class="form-text"> ' + elLabel + elAst + ': ' + tooltip + ' </label><br>' +
                            '<div lx_cm="' + elHTML_ID + '"    class="' + elClass + '" style="' + elStyle + '"  ' + elAtrib + ' > ' +
                            '</div>' +
                            '<small id="' + elHTML_ID + '_mini" style="display: none;" class="form-text form-text-error" >Verifica la informaci&oacute;n</small>'
                        );


                        if (item.items) {

                            $.each(item.items, function (j, jtem) {
                                var value = j + 1;
                                var id = el.makeid(12);
                                if (jtem.id && jtem.id) {
                                    id = jtem.id;
                                }
                                if (jtem.value && jtem.value !== '') {
                                    value = jtem.value;
                                }

                                var sep = '';
                                if (item.itemSepartor) {
                                    sep = item.itemSepartor;
                                }

                                $('[lx_cm="' + elHTML_ID + '"]').append(sep + '<input id="' + id + '" type="checkbox" name="' + item.name + '" value="' + value + '" > ' + jtem.text);
                            });
                        }


                        break;
                    /*Input type password*/
                    case 'password':
                        var maxlength = '';
                        if (item.maxLength && item.maxLength !== '') {
                            maxlength = item.maxLength;
                        }
                        $('#' + el.HTML_ID).append(separator + '<label class="form-text"> ' + elLabel + elAst + ': ' + tooltip + ' </label><br>' +
                            '<input lx_cm="' + elHTML_ID + '" autocomplete="off" type="password" placeholder="' + elPlaceholder + '" maxlength="' + maxlength + '" name="' + elName + '" id="' + elId + '" class="' + elClass + '" style="' + elStyle + '"  ' + elAtrib + ' >' +
                            '<small id="' + elHTML_ID + '_mini" style="display: none;" class="form-text form-text-error" >Verifica la informaci&oacute;n</small>'
                        );
                        break;
                    /*Input type number*/
                    case 'number':
                        var maxlength = '';
                        if (item.maxLength && item.maxLength.toString() !== '') {
                            maxlength = item.maxLength;
                        }
                        var max = '';
                        if (item.maxNumber && item.maxNumber.toString() !== '') {
                            max = item.maxNumber;
                        }
                        var min = '';
                        if (item.minNumber && item.minNumber.toString() !== '') {
                            min = item.minNumber;
                        }

                        $('#' + el.HTML_ID).append(separator + '<label class="form-text"> ' + elLabel + elAst + ': ' + tooltip + ' </label><br>' +
                            '<input lx_cm="' + elHTML_ID + '" placeholder="' + elPlaceholder + '"  min="' + min + '" max="' + max + '" type="number" maxlength="' + maxlength + '" name="' + elName + '" id="' + elId + '" class="' + elClass + '" style="' + elStyle + '"  ' + elAtrib + ' >' +
                            '<small id="' + elHTML_ID + '_mini" style="display: none;" class="form-text form-text-error" >Verifica la informaci&oacute;n</small>'
                        );
                        break;
                    default:
                        console.warn('unrecognized type ' + item.type);
                        break;
                }
            } else {
                console.warn('unset type for field no ' + i);
            }
        });
    };
    this.drawSubmit = function (value, classs, id, preventDefault) {
        var el = this;
        if (!id) {
            id = el.makeid();
        }
        if (!classs) {
            classs = '';
        }
        if (!value) {
            value = 'send';
        }
        $('#' + el.HTML_ID).append('<br><input class="' + classs + '" type="submit" value="' + value + '" id="' + id + '">');

        if (preventDefault === true) {
            $('#' + id).click(function (e) {
                e.preventDefault();
            });
        }

    }
    this.inicialize = function (F_er, F_) {
        var el = this;
        var options = el.options;
        var validTypes = ['checkbox', 'radio', 'range', 'time', 'date', 'color', 'email', 'file', 'text', 'textarea', 'select', 'password', 'number'];
        $.each(el.ObjArray, function (i, item) {
            item.errors = [];
            if (item.lx_cm && item.type && validTypes.includes(item.type) && item.options && item.options.validateOn) {
                var validateOn = item.options.validateOn;

                var skipUntilEndValidation = [];
                if (item.options.skipUntilEndValidation) {
                    skipUntilEndValidation = item.options.skipUntilEndValidation;
                }
                var lx_cm = item.lx_cm;
                if (validateOn.includes('keyUp')) {
                    $('[lx_cm="' + lx_cm + '"]').keyup(function () {
                        el.resetField(item.lx_cm);
                        var x = el.validations(el, item, skipUntilEndValidation);
                        if (x.success === false) {
                            if (F_er && $.isFunction(F_er)) {
                                F_er(x.errors);
                            }
                        }
                    });
                }
                if (validateOn.includes('keyDown')) {
                    $('[lx_cm="' + lx_cm + '"]').keydown(function () {
                        el.resetField(item.lx_cm);
                        var x = el.validations(el, item, skipUntilEndValidation);
                        if (x.success === false) {
                            if (F_er && $.isFunction(F_er)) {
                                F_er(x.errors);
                            }
                        }
                    });
                }
                if (validateOn.includes('Change')) {
                    $('[lx_cm="' + lx_cm + '"]').change(function () {
                        el.resetField(item.lx_cm);
                        var x = el.validations(el, item, skipUntilEndValidation);
                        if (x.success === false) {
                            if (F_er && $.isFunction(F_er)) {
                                F_er(x.errors);
                            }
                        }
                    });
                }
                if (validateOn.includes('Click')) {
                    $('[lx_cm="' + lx_cm + '"]').click(function () {
                        el.resetField(item.lx_cm);
                        var x = el.validations(el, item, skipUntilEndValidation);
                        if (x.success === false) {
                            if (F_er && $.isFunction(F_er)) {
                                F_er(x.errors);
                            }
                        }
                    });
                }

                /*Forzar limites y cambio de estado */
                $('[lx_cm="' + lx_cm + '"]').change(function () {
                    var valueI = $('[lx_cm="' + lx_cm + '"]').val();
                    if (item.type === 'number' && valueI !== '' && item.numberOfDecimals && item.numberOfDecimals !== "") {
                        if (Number(item.numberOfDecimals) === 0) {
                            valueI = Math.trunc(el.CutDecimals(Number(valueI), item.numberOfDecimals), 0);
                        } else {
                            valueI = el.CutDecimals(Number(valueI), item.numberOfDecimals);
                        }

                        $('[lx_cm="' + lx_cm + '"]').val(valueI);
                    }

                    if (item.type === 'file' && item.accept && item.accept.toUpperCase().includes('PDF')) {
                        el.extChanged(el, item);
                    }
                    if (item.type === 'file' && item.options.getDataAs && item.options.getDataAs !== '') {
                        item.data = '';
                        el.chargeData(el, item, item.options.getDataAs);
                    } else if (item.type === 'select' && item.options.getDataAs && item.options.getDataAs === 'text') {
                        item.data = $('[lx_cm="' + lx_cm + '"] option:selected').text();
                    } else if (item.type === 'select' && item.options.getDataAs && item.options.getDataAs === 'value') {
                        item.data = $('[lx_cm="' + lx_cm + '"]').val();
                    } else if (item.type !== 'file' && item.type !== 'select' && item.options.getDataAs && item.options.getDataAs === 'text') {
                        item.data = $('[lx_cm="' + lx_cm + '"]').val();
                    } else {
                        item.data = $('[lx_cm="' + lx_cm + '"]').val();
                    }


                });

                $('[lx_cm="' + lx_cm + '"]').change(function () {
                    if (item.type === 'text') {
                        if (item.options && item.options.toUpperCase) {
                            var txt = $('[lx_cm="' + lx_cm + '"]').val();
                            $('[lx_cm="' + lx_cm + '"]').val(txt.toUpperCase());
                        }
                        if (item.options && item.options.toLowerCase) {
                            var txt = $('[lx_cm="' + lx_cm + '"]').val();
                            $('[lx_cm="' + lx_cm + '"]').val(txt.toLowerCase());
                        }
                        if (item.options && item.options.forceLimits && item.maxLength) {
                            var txt = $('[lx_cm="' + lx_cm + '"]').val();
                            $('[lx_cm="' + lx_cm + '"]').val(txt.substring(1, Number(item.maxLength)));
                        }
                    }
                    if (item.type === 'textarea') {
                        if (item.options && item.options.toUpperCase) {
                            var txt = $('[lx_cm="' + lx_cm + '"]').val();
                            $('[lx_cm="' + lx_cm + '"]').val(txt.toUpperCase());
                        }
                        if (item.options && item.options.toLowerCase) {
                            var txt = $('[lx_cm="' + lx_cm + '"]').val();
                            $('[lx_cm="' + lx_cm + '"]').val(txt.toLowerCase());
                        }

                    }
                    if (item.type === 'number') {
                        if (item.options && item.options.forceLimits && item.maxLength) {
                            var txt = $('[lx_cm="' + lx_cm + '"]').val();
                            $('[lx_cm="' + lx_cm + '"]').val(txt.substring(0, Number(item.maxLength)));
                        }
                    }
                });
                if (item.type === 'email' || item.type === 'password' || item.type === 'text') {
                    if (item.options && item.options.disableCopyPaste) {
                        el.disableCopyPaste(item.lx_cm);
                    }
                }
            }

            try {
                $('#_tooltip' + item.lx_cm + '_').tooltip();
            } catch (e) {
                setTimeout(function () {
                    try {
                        $('#_tooltip' + item.lx_cm + '_').tooltip();
                    } catch (e) {
                        try {
                            var selector = $('#_tooltip' + item.lx_cm + '_');
                            new Foundation.Tooltip(selector, {});
                        } catch (e) {
                            try {
                                var selector = $('#_tooltip' + item.lx_cm + '_');
                                new Foundation.Tooltip(selector, {});
                            }
                            catch (e) {
                            }
                        }
                    }
                }, 1000 * 2);
            }

        });
        if (F_ && $.isFunction(F_)) {
            F_();
        }
    };
    this.getData = function (_element_, getAs) {
        var el = this;
        if (!getAs) {
            getAs = 'value';
        }
        var lx_cm = '';
        var No_elem = -1;

        if ((_element_ && isNaN(_element_) && _element_.includes('radio:')) || (_element_ && isNaN(_element_) && _element_.includes('checkbox:'))) {

            if (_element_.includes('checkbox')) {
                _element_ = _element_.replace('checkbox:', '');
                var arrInt = [];
                $("input[name='" + _element_ + "']:checked").each(function () {
                    arrInt.push($(this).val());
                })
                return arrInt;

            } else {
                _element_ = _element_.replace('radio:', '');
                return $("input[name='" + _element_ + "']:checked").val();
            }


        } else if ((_element_ && isNaN(_element_) && _element_.includes('id:')) || (_element_ && isNaN(_element_) && _element_.includes('class:'))) {
            _element_ = _element_.replace('id:', '#');
            _element_ = _element_.replace('class', '.');
            lx_cm = $(_element_).attr('lx_cm');
            No_elem = el.findOutIn(lx_cm, el);

        } else if (_element_ && !isNaN(_element_)) {
            if (_element_ > el.ObjArray.length) {
                console.warn('No se encuentra el  elemento solicitado');
            } else {
                lx_cm = el.ObjArray[_element_ - 1].lx_cm;
                No_elem = _element_;
            }
        }
        if (lx_cm && No_elem !== -1 && el.ObjArray[No_elem].type === 'select') {
            if (getAs === 'text') {
                return $("[lx_cm='" + lx_cm + "'] option:selected").text();
            } else if (getAs === 'value') {
                return $("[lx_cm='" + lx_cm + "']").val();
            }
        } else if (lx_cm && No_elem !== -1 && el.ObjArray[No_elem].type.trim().toLowerCase() === 'file') {

            if (getAs === 'content') {
                if (el.ObjArray[No_elem].data) {
                    return el.ObjArray[No_elem].data;
                }
                return '';
            } else if (getAs === 'value') {
                return $("[lx_cm='" + lx_cm + "']").val().replace('C:\\fakepath\\', '');
            }
            else if (getAs === 'ext') {
                var x = $("[lx_cm='" + lx_cm + "']").val().replace('C:\\fakepath\\', '');
                if (x !== '') {
                    x = x.split('.');
                    return '.' + x[1];
                } else {
                    return '';
                }
            } else if (getAs === 'namefile') {
                var x = $("[lx_cm='" + lx_cm + "']").val().replace('C:\\fakepath\\', '');
                if (x !== '') {
                    x = x.split('.');
                    return x[0];
                } else {
                    return '';
                }
            }
        } else if (lx_cm && el.ObjArray[No_elem].type !== 'file' && el.ObjArray[No_elem].type !== 'select') {

            return $("[lx_cm='" + lx_cm + "']").val();

        } else {
            var arrData = [];
            $.each(el.ObjArray, function (i, item) {
                if (item.type === 'checkbox' && item.name && item.name !== '') {
                    var arrInt = [];
                    $("input[name='" + item.name + "']:checked").each(function () {
                        arrInt.push($(this).val());
                    })
                    arrData.push(arrInt);
                } else if (item.type === 'radio' && item.name && item.name !== '') {
                    arrData.push($("input[name='" + item.name + "']:checked").val());
                } else if (item.type === 'file' && item.data) {
                    arrData.push(item.data);
                } else if (item.type === 'file' && !item.data) {
                    arrData.push($('[lx_cm="' + item.lx_cm + '"]').val());
                } else if (item.type === 'checkbox' && item.name && item.name !== '') {
                    arrData.push($("input[name='" + item.name + "']:checked").val());
                }
                else if (item.type === 'radio' && item.name && item.name !== '') {
                    arrData.push($("input[name='" + item.name + "']:checked").val());
                } else {
                    arrData.push($('[lx_cm="' + item.lx_cm + '"]').val());
                }
            });

            return arrData;
        }
        return false;
    };
    this.setData = function (_element_, val) {

        var el = this;

        if ((_element_ && isNaN(_element_) && _element_.includes('radioid:')) || (_element_ && isNaN(_element_) && _element_.includes('checkboxid:'))) {
            _element_ = _element_.replace('radioid:', '');
            _element_ = _element_.replace('checkboxid:', '');
            $("#" + _element_).prop('checked', val);
        }
        if ((_element_ && isNaN(_element_) && _element_.includes('id:')) || (_element_ && isNaN(_element_) && _element_.includes('class:'))) {
            _element_ = _element_.replace('id:', '#');
            _element_ = _element_.replace('class', '.');
            var lx_cm = $(_element_).attr('lx_cm');
            $('[lx_cm = "' + lx_cm + '"]').val(val);
        } else if (_element_ && !isNaN(_element_)) {
            if (_element_ > el.ObjArray.length) {
                console.warn('No se encuentra el  elemento solicitado');
            } else {
                var lx_cm = el.ObjArray[_element_ - 1].lx_cm;
                $('[lx_cm = "' + lx_cm + '"]').val(val);
            }
        } else {
            console.warn('No se encuentra el  elemento solicitado');
        }

    };
    this.getAllSelectors = function () {
        return this.selectors;
    }
    this.validate = function () {
        var el = this;
        var gralErrors = [];
        var validTypes = ['checkbox', 'radio', 'range', 'time', 'date', 'color', 'email', 'file', 'text', 'textarea', 'select', 'password', 'number'];
        $.each(el.ObjArray, function (i, item) {
            el.resetField(item.lx_cm);
            item.errors = [];
            var skipAtEndValidation = [];
            if (item.options.skipAtEndValidation && item.options) {
                skipAtEndValidation = item.options.skipAtEndValidation;
            }
            if (item.lx_cm && item.type && validTypes.includes(item.type)) {
                var XX_ = el.validations(el, item, skipAtEndValidation);
                if (!XX_.success) {
                    gralErrors.push(XX_.errors);
                    item.errors.push(XX_.errors);
                }
            }

            if (item.type === 'file' && item.accept && item.accept.toUpperCase().includes('PDF') && !item.successPDF && item.data && item.data !== '') {
                var errPDF = "File isn't PDF or is corrupted";
                if (el.options && el.options.textsErr && el.options.textsErr.ErrPDF && el.options.textsErr.ErrPDF !== '') {
                    errPDF = el.options.textsErr.ErrPDF;
                }
                gralErrors.push([errPDF]);
                item.errors.push([errPDF]);
                el.drawError(item.lx_cm, errPDF);
            }
        });

        if (gralErrors.length > 0) {
            return {
                success: false,
                errors: gralErrors
            }
        } else {
            return {
                success: true,
                errors: 'none'
            }
        }

    };
    this.getFormAsSelector = function () {
        var el = this;
        return $('#' + el.HTML_ID);
    };
    this.disableElement = function (_element_) {
        var el = this;
        if ((_element_ && isNaN(_element_) && _element_.includes('id:') ) || (_element_ && isNaN(_element_) && _element_.includes('class:'))) {
            _element_ = _element_.replace('id:', '#');
            _element_ = _element_.replace('class', '.');
            $(_element_).prop('disabled', true);
        } else if (_element_ && !isNaN(_element_)) {
            if (_element_ > el.ObjArray.length) {
                console.warn('No se encuentra el  elemento solicitado');
            } else {
                var lx_cm = el.ObjArray[_element_ - 1].lx_cm;
                $('[lx_cm = "' + lx_cm + '"]').prop('disabled', true);
            }
        } else {
            console.warn('No se encuentra el  elemento solicitado');
        }
    };
    this.enableElement = function (_element_) {
        var el = this;
        if ((_element_ && isNaN(_element_) && _element_.includes('id:')) || (_element_ && isNaN(_element_) && _element_.includes('class:'))) {

            _element_ = _element_.replace('id:', '#');
            _element_ = _element_.replace('class', '.');
            $(_element_).prop('disabled', true);

        } else if (_element_ && !isNaN(_element_)) {

            if (_element_ > el.ObjArray.length) {
                console.warn('No se encuentra el  elemento solicitado');
            } else {
                var lx_cm = el.ObjArray[_element_ - 1].lx_cm;
                $('[lx_cm = "' + lx_cm + '"]').prop('disabled', false);
            }
        } else {
            console.warn('No se encuentra el  elemento solicitado');
        }
    };
    this.getElementAsSelector = function (_element_) {
        var el = this;
        if ((_element_ && isNaN(_element_) && _element_.includes('id:')) || (_element_ && isNaN(_element_) && _element_.includes('class:'))) {
            _element_ = _element_.replace('id:', '#');
            _element_ = _element_.replace('class', '.');
            var lx_cm = $(_element_).attr('lx_cm');
            return $('[lx_cm = "' + lx_cm + '"]');
        } else if (_element_ && !isNaN(_element_)) {
            if (_element_ > el.ObjArray.length) {
                console.warn('No se encuentra el  elemento solicitado');
            } else {
                var lx_cm = el.ObjArray[_element_ - 1].lx_cm;
                return $('[lx_cm = "' + lx_cm + '"]');
            }
        } else {
            console.warn('No se encuentra el  elemento solicitado');
        }
    };
    this.findOutIn = function (lx_cm, el) {

        var POS = -1;
        $.each(el.ObjArray, function (i, item) {
            if (item.lx_cm && item.lx_cm === lx_cm) {
                POS = i;
            }
        });
        return POS;
    };
    this.waitForEl = function (selector, callback) {
        if (jQuery(selector).length) {
            callback();
        } else {
            setTimeout(function () {
                waitForEl(selector, callback);
            }, 100);
        }
    };
    this.chargeData = function (el, item, DataAs) {
        var value = $('[lx_cm = "' + item.lx_cm + '"]').val();
        if (!value || value === '') {
            item.data = '';
            return 0;
        }
        var file = document.querySelectorAll('[lx_cm ="' + item.lx_cm + '"]')[0].files[0];
        if (DataAs === 'text') {
            var reader = new FileReader();
            reader.onload = function (event) {
                var text = reader.result;
                item.data = text;
            };
            reader.readAsText(file);
        }
        if (DataAs === 'b64') {
            var reader = new FileReader(file);
            reader.onload = function (event) {
                var text = reader.result;
                item.data = text;
            };
            reader.readAsDataURL(file);
        }
    };
    this.extChanged = function (el, item) {
        var value = $('[lx_cm = "' + item.lx_cm + '"]').val();
        if (!value || value === '') {
            item.data = '';
            return 0;
        }
        var file = document.querySelectorAll('[lx_cm ="' + item.lx_cm + '"]')[0].files[0];
        var reader = new FileReader(file);
        reader.onload = function (event) {
            var text = reader.result;
            var firstLine = text.split('\n').shift(); // first line
            if (!(firstLine.toString().toUpperCase().includes('PDF'))) {
                item.successPDF = false;
                var errPDF = "File isn't PDF or is corrupted";
                if (el.options && el.options.textsErr && el.options.textsErr.ErrPDF && el.options.textsErr.ErrPDF !== '') {
                    errPDF = el.options.textsErr.ErrPDF;
                }
                el.drawError(item.lx_cm, errPDF);
            } else {
                item.successPDF = true;
            }
        }
        reader.readAsText(file, 'UTF-8');
    };
    this.validations = function (el, item, skipUntilEndValidation) {

        var textsErr = {};
        if (el.options.textsErr) {
            textsErr = el.options.textsErr;
        }
        var errors = [];

        switch (item.type) {
            case 'file' :
                /*Validation max size file*/
                if (!skipUntilEndValidation.includes('maxtam')) {
                    var x = '';
                    x = el.validateFileSize(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation file accept*/
                if (!skipUntilEndValidation.includes('accept')) {
                    var x = '';
                    x = el.validateFileAccept(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation mandatory */
                if (!skipUntilEndValidation.includes('mandatory')) {
                    var x = '';
                    x = el.validateMandatory(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation unique*/
                if (!skipUntilEndValidation.includes('unique')) {
                    var x = '';
                    x = el.validateUnique(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation pattern*/
                if (!skipUntilEndValidation.includes('pattern')) {
                    var x = '';
                    x = el.validatePatern(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                break;
            case 'select':
                /*Validation mandatory */
                if (!skipUntilEndValidation.includes('mandatory')) {
                    var x = '';
                    x = el.validateMandatory(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation unique*/
                if (!skipUntilEndValidation.includes('unique')) {
                    var x = '';
                    x = el.validateUnique(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                break;
            case 'text' :
                /*Validation mandatory */
                if (!skipUntilEndValidation.includes('mandatory')) {
                    var x = '';
                    x = el.validateMandatory(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation unique*/
                if (!skipUntilEndValidation.includes('unique')) {
                    var x = '';
                    x = el.validateUnique(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation pattern*/
                if (!skipUntilEndValidation.includes('pattern')) {
                    var x = '';
                    x = el.validatePatern(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation min length*/
                if (!skipUntilEndValidation.includes('minLength')) {
                    var x = '';
                    x = el.validateMinLength(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation max length*/
                if (!skipUntilEndValidation.includes('maxLength')) {
                    var x = '';
                    x = el.validateMaxLength(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation max length*/
                if (!skipUntilEndValidation.includes('includes')) {
                    var x = '';
                    x = el.validateIncludes(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation max length*/
                if (!skipUntilEndValidation.includes('matchTo')) {
                    var x = '';
                    x = el.validateMatchTo(el, item);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                break;
            case 'date' :
                /*Validation mandatory */
                if (!skipUntilEndValidation.includes('mandatory')) {
                    var x = '';
                    x = el.validateMandatory(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation unique*/
                if (!skipUntilEndValidation.includes('unique')) {
                    var x = '';
                    x = el.validateUnique(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation min date*/
                if (!skipUntilEndValidation.includes('minDate')) {
                    var x = '';
                    x = el.validateMinDate(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation max date*/
                if (!skipUntilEndValidation.includes('maxDate')) {
                    var x = '';
                    x = el.validateMaxDate(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation max length*/
                break;
            case 'time' :
                /*Validation mandatory */
                if (!skipUntilEndValidation.includes('mandatory')) {
                    var x = '';
                    x = el.validateMandatory(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation unique*/
                if (!skipUntilEndValidation.includes('unique')) {
                    var x = '';
                    x = el.validateUnique(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation min date*/
                if (!skipUntilEndValidation.includes('minTime')) {
                    var x = '';
                    x = el.validateMinTime(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation max date*/
                if (!skipUntilEndValidation.includes('maxtime')) {
                    var x = '';
                    x = el.validateMaxTime(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation max length*/
                break;
            case 'email' :
                /*Validation mandatory */
                if (!skipUntilEndValidation.includes('mandatory')) {
                    var x = '';
                    x = el.validateMandatory(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation unique*/
                if (!skipUntilEndValidation.includes('unique')) {
                    var x = '';
                    x = el.validateUnique(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation pattern*/
                if (!skipUntilEndValidation.includes('pattern')) {
                    var x = '';
                    x = el.validateMail(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation min length*/
                if (!skipUntilEndValidation.includes('minLength')) {
                    var x = '';
                    x = el.validateMinLength(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation max length*/
                if (!skipUntilEndValidation.includes('maxLength')) {
                    var x = '';
                    x = el.validateMaxLength(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }

                /*Validation max length*/
                if (!skipUntilEndValidation.includes('matchTo')) {
                    var x = '';
                    x = el.validateMatchTo(el, item);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                break;
            case 'color' :
                /*Validation mandatory */
                if (!skipUntilEndValidation.includes('mandatory')) {
                    var x = '';
                    x = el.validateMandatory(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                break;
            case 'range' :
                /*Validation mandatory */
                if (!skipUntilEndValidation.includes('mandatory')) {
                    var x = '';
                    x = el.validateMandatory(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                break;
            case 'radio':

                break;
            case 'checkbox':
                /*Validation mandatory */
                if (!skipUntilEndValidation.includes('mandatory')) {
                    var x = '';
                    x = el.validateMandatory(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                break;
            case 'number':
                /*Validation mandatory */
                if (!skipUntilEndValidation.includes('mandatory')) {
                    var x = '';
                    x = el.validateMandatory(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation unique*/
                if (!skipUntilEndValidation.includes('unique')) {
                    var x = '';
                    x = el.validateUnique(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation pattern*/
                if (!skipUntilEndValidation.includes('pattern')) {
                    var x = '';
                    x = el.validatePatern(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation min length*/
                if (!skipUntilEndValidation.includes('minLength')) {
                    var x = '';
                    x = el.validateMinLength(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation max length*/
                if (!skipUntilEndValidation.includes('maxLength')) {
                    var x = '';
                    x = el.validateMaxLength(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation includes*/
                if (!skipUntilEndValidation.includes('includes')) {
                    var x = '';
                    x = el.validateIncludes(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation match to*/
                if (!skipUntilEndValidation.includes('matchTo')) {
                    var x = '';
                    x = el.validateMatchTo(el, item);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation min num*/
                if (!skipUntilEndValidation.includes('minNumber')) {
                    var x = '';
                    x = el.validateMinNumber(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation max num*/
                if (!skipUntilEndValidation.includes('maxNumber')) {
                    var x = '';
                    x = el.validateMaxNumber(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }

                break;
            case 'textarea' :
                /*Validation mandatory */
                if (!skipUntilEndValidation.includes('mandatory')) {
                    var x = '';
                    x = el.validateMandatory(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation unique*/
                if (!skipUntilEndValidation.includes('unique')) {
                    var x = '';
                    x = el.validateUnique(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation pattern*/
                if (!skipUntilEndValidation.includes('pattern')) {
                    var x = '';
                    x = el.validatePatern(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation min length*/
                if (!skipUntilEndValidation.includes('minLength')) {
                    var x = '';
                    x = el.validateMinLength(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation max length*/
                if (!skipUntilEndValidation.includes('maxLength')) {
                    var x = '';
                    x = el.validateMaxLength(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation includes*/
                if (!skipUntilEndValidation.includes('includes')) {
                    var x = '';
                    x = el.validateIncludes(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation match to*/
                if (!skipUntilEndValidation.includes('matchTo')) {
                    var x = '';
                    x = el.validateMatchTo(el, item);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                break;
            case 'password' :
                /*Validation mandatory */
                if (!skipUntilEndValidation.includes('mandatory')) {
                    var x = '';
                    x = el.validateMandatory(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation unique*/
                if (!skipUntilEndValidation.includes('unique')) {
                    var x = '';
                    x = el.validateUnique(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation min length*/
                if (!skipUntilEndValidation.includes('minLength')) {
                    var x = '';
                    x = el.validateMinLength(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation max length*/
                if (!skipUntilEndValidation.includes('maxLength')) {
                    var x = '';
                    x = el.validateMaxLength(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation match to*/
                if (!skipUntilEndValidation.includes('matchTo')) {
                    var x = '';
                    x = el.validateMatchTo(el, item);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                /*Validation password*/
                if (!skipUntilEndValidation.includes('password')) {
                    var x = '';
                    x = el.validatePassword(el, item, textsErr);
                    if (!x.success) {
                        errors.push(x.message);
                    }
                }
                break;
            default:
                console.warn('unrecognized type ' + item.type);
                break;
        }
        if (errors.length > 0) {
            el.drawError(item.lx_cm, errors.join(', '))
            return {
                success: false,
                errors: errors
            }
        } else {
            return {
                success: true,
                errors: 'none'
            }
        }
    };
    this.validateFileSize = function (el, item, textsErr) {
        var MSGERR = 'File size is greater than _XX_ MB';
        var r = {};
        if (textsErr.ErrMaxSize) {
            MSGERR = textsErr.ErrMaxSize;
        }
        var val = $('[lx_cm ="' + item.lx_cm + '"]').val();
        if (val && val !== '') {
            var file_size = $('[lx_cm ="' + item.lx_cm + '"]')[0].files[0].size;
            if (file_size > item.maxtam * 1024 * 1024) {
                item.errors.push('maxtam');
                r = {
                    success: false,
                    message: MSGERR.replace('_XX_', item.maxtam.toString())
                };
            } else {
                r = {
                    success: true,
                    message: 'none'
                };
            }
            return r;
        }
        r = {
            success: true,
            message: 'none'
        };
        return r;

    };
    this.validateFileAccept = function (el, item, textsErr) {
        var value = $('[lx_cm = "' + item.lx_cm + '"]').val();
        if (!value || value === '') {
            r = {
                success: true,
                message: 'none'
            };
            return r;
        }
        var MSGERR = 'File format _XX_ is invalid';
        var r = {};
        if (textsErr.ErrFileAccept) {
            MSGERR = textsErr.ErrFileAccept;
        }
        var campo = document.querySelectorAll('[lx_cm="' + item.lx_cm + '"]');
        campo = campo[0];

        if (campo.value.toUpperCase().includes(item.accept.toUpperCase())) {
            r = {
                success: true,
                message: 'none'
            };
            return r;

        } else {
            r = {
                success: false,
                message: MSGERR.replace('_XX_', item.accept)
            };
            return r;
        }
    };
    this.validateMandatory = function (el, item, textsErr) {
        var MSGERR = 'This filed is mandatory';
        var r = {};
        if (textsErr.ErrMandatory) {
            MSGERR = textsErr.ErrMandatory;
        }
        if (item.mandatory === true) {
            var val = $('[lx_cm ="' + item.lx_cm + '"]').val();
            if (item.type === 'checkbox') {
                if (!el.getData('checkbox:' + item.name)) {
                    r = {
                        success: false,
                        message: MSGERR
                    };
                    return r;
                }
            } else if (item.type === 'select' && Number(val) === -1) {
                item.errors.push('mandatory');
                r = {
                    success: false,
                    message: MSGERR
                };
                return r;
            }
            else if (item.type !== 'select' && val.toString() === '') {
                item.errors.push('mandatory');
                r = {
                    success: false,
                    message: MSGERR
                };
                return r;
            }
        }
        r = {
            success: true,
            message: 'none'
        };
        return r;


    };
    this.validateUnique = function (el, item, textsErr) {
        var MSGERR = 'This was insert in another field';
        var r = {};
        if (textsErr.ErrUnique) {
            MSGERR = textsErr.ErrUnique;
        }
        var val = $('[lx_cm ="' + item.lx_cm + '"]').val();
        if (item.unique === true && val !== '') {

            var count = 0;
            $('form#' + el.HTML_ID + ' :input').each(function () {
                var r_lx_cm = $(this).attr('lx_cm');
                //el.resetField(r_lx_cm);
                if ($(this).val() === val) {
                    count++;
                    if (r_lx_cm !== item.lx_cm) {
                        el.drawError(r_lx_cm, MSGERR);
                    }
                }
            });
            if (count >= 2) {

                r = {
                    success: false,
                    message: MSGERR
                };
                return r;
            }
        }
        r = {
            success: true,
            message: 'none'
        };
        return r;
    };
    this.validateMatchTo = function (el, item) {
        var MSGERR = 'This field not match with  field ';
        var r = {};
        var val = $('[lx_cm ="' + item.lx_cm + '"]').val();
        if (item.type !== 'file' && val !== '' && item.options && item.options.matchTo && item.options.matchTo !== '') {

            if (item.options.matchToText) {
                MSGERR = item.options.matchToText;
            }
            var selector = item.options.matchTo;
            selector = selector.replace('id:', '#');
            selector = selector.replace('class:', '.');

            var r_lx_cm = $(selector).attr('lx_cm');
            //   el.resetField(r_lx_cm);
            if ($(selector).val() !== val) {
                r = {
                    success: false,
                    message: MSGERR
                };
                el.drawError(r_lx_cm, MSGERR);
                return r;
            }
        }
        r = {
            success: true,
            message: 'none'
        };
        return r;
    };
    this.validatePatern = function (el, item, textsErr) {
        var MSGERR = 'Pattern  not match ';
        var r = {};
        var val = $('[lx_cm ="' + item.lx_cm + '"]').val();
        if (item.type === 'file') {
            val = val.replace('C:\\fakepath\\', '');
            if (item.accept) {
                val = val.replace(item.accept, '');
            }
            val = val.replace(/\\/g, '');
            val = val.replace(/\./g, '');
        }
        if (val !== '' && item.pattern && item.pattern !== '') {
            if (item.pattern === 'alphanumeric') {
                if (textsErr.ErrPatternAlph) {
                    MSGERR = textsErr.ErrPatternAlph;
                }
                var test = el.validateAlphanumeric(val);
                if (!test) {
                    r = {
                        success: false,
                        message: MSGERR
                    };
                    return r;
                }
            }
            else if (item.pattern === 'numeric') {
                if (textsErr.ErrPatternNumeric) {
                    MSGERR = textsErr.ErrPatternNumeric;
                }

                if (isNaN(val)) {
                    r = {
                        success: false,
                        message: MSGERR
                    };
                    return r;
                }
            }
            else {

                if (textsErr.ErrPattern) {
                    MSGERR = textsErr.ErrPattern;
                }
                var test = el.validateTestPattern(val, item.pattern);
                if (!test) {
                    r = {
                        success: false,
                        message: MSGERR
                    };
                    return r;
                }
            }
        }
        r = {
            success: true,
            message: 'none'
        };
        return r;

    };
    this.validateMinLength = function (el, item, textsErr) {
        var MSGERR = 'Content is too short, must be at least _XX_ long';
        var r = {};
        var val = $('[lx_cm ="' + item.lx_cm + '"]').val();
        if (textsErr.ErrMinLength) {
            MSGERR = textsErr.ErrMinLength;
        }

        if (item.type !== 'file' && val !== '' && item.minLength && item.minLength !== '') {
            if (val.length < Number(item.minLength)) {
                r = {
                    success: false,
                    message: MSGERR.replace('_XX_', item.minLength)
                };
                return r;
            }
        }
        r = {
            success: true,
            message: 'none'
        };
        return r;
    };
    this.validateMinDate = function (el, item, textsErr) {
        var MSGERR = 'Date will be at least  _XX_ ';
        var r = {};
        var val = $('[lx_cm ="' + item.lx_cm + '"]').val();
        if (textsErr.ErrMinDate) {
            MSGERR = textsErr.ErrMinDate;
        }

        if (item.type === 'date' && val && val !== '' && item.minDate && item.minDate !== '') {
            var fecha = item.minDate;
            fecha = fecha.replace(/-/g, '');
            var val2 = val.replace(/-/g, '');


            if (Number(val2) < Number(fecha)) {
                r = {
                    success: false,
                    message: MSGERR.replace('_XX_', item.minDate)
                };
                return r;
            }
        }
        r = {
            success: true,
            message: 'none'
        };
        return r;
    };
    this.validateMinTime = function (el, item, textsErr) {
        var MSGERR = 'time will be at least  _XX_ ';
        var r = {};
        var val = $('[lx_cm ="' + item.lx_cm + '"]').val();
        if (textsErr.ErrMinTime) {
            MSGERR = textsErr.ErrMinTime;
        }

        if (item.type === 'time' && val && val !== '' && item.minTime && item.minTime !== '') {
            var fecha = item.minTime;
            fecha = fecha.replace(/:/g, '');
            var val2 = val.replace(/:/g, '');
           

            if (Number(val2) < Number(fecha)) {
                r = {
                    success: false,
                    message: MSGERR.replace('_XX_', item.minTime)
                };
                return r;
            }
        }
        r = {
            success: true,
            message: 'none'
        };
        return r;
    };
    this.validateMaxTime = function (el, item, textsErr) {
        var MSGERR = 'time will be as much  _XX_ ';
        var r = {};
        var val = $('[lx_cm ="' + item.lx_cm + '"]').val();
        if (textsErr.ErrMaxTime) {
            MSGERR = textsErr.ErrMaxTime;
        }

        if (item.type === 'time' && val && val !== '' && item.maxTime && item.maxTime !== '') {
            var fecha = item.maxTime;
            fecha = fecha.replace(/:/g, '');
            var val2 = val.replace(/:/g, '');
         

            if (Number(val2) > Number(fecha)) {
                r = {
                    success: false,
                    message: MSGERR.replace('_XX_', item.maxTime)
                };
                return r;
            }
        }
        r = {
            success: true,
            message: 'none'
        };
        return r;
    };
    this.validateMaxDate = function (el, item, textsErr) {
        var MSGERR = 'Date will be as much  _XX_ ';
        var r = {};
        var val = $('[lx_cm ="' + item.lx_cm + '"]').val();
        if (textsErr.ErrMaxDate) {
            MSGERR = textsErr.ErrMaxDate;
        }

        if (item.type === 'date' && val && val !== '' && item.maxDate && item.maxDate !== '') {
            var fecha = item.maxDate;
            fecha = fecha.replace(/-/g, '');
            var val2 = val.replace(/-/g, '');


            if (Number(val2) > Number(fecha)) {
                r = {
                    success: false,
                    message: MSGERR.replace('_XX_', item.maxDate)
                };
                return r;
            }
        }
        r = {
            success: true,
            message: 'none'
        };
        return r;
    };
    this.validateMaxLength = function (el, item, textsErr) {
        var MSGERR = 'Content is too long, must be as _XX_ at long';
        var r = {};
        var val = $('[lx_cm ="' + item.lx_cm + '"]').val();
        if (textsErr.ErrMaxLength) {
            MSGERR = textsErr.ErrMaxLength;
        }

        if (item.type !== 'file' && val !== '' && item.maxLength && item.maxLength !== '') {
            if (val.length > Number(item.maxLength)) {
                r = {
                    success: false,
                    message: MSGERR.replace('_XX_', item.maxLength)
                };
                return r;
            }
        }
        r = {
            success: true,
            message: 'none'
        };
        return r;
    };
    this.validateIncludes = function (el, item, textsErr) {
        var MSGERR = 'Content don\'t include _XX_';
        var r = {};
        var val = $('[lx_cm ="' + item.lx_cm + '"]').val();
        if (textsErr.ErrIncludes) {
            MSGERR = textsErr.ErrIncludes;
        }

        if (item.type !== 'file' && val !== '' && item.includes && item.includes !== '') {
            if (!val.includes(item.includes)) {
                r = {
                    success: false,
                    message: MSGERR.replace('_XX_', item.includes)
                };
                return r;
            }
        }
        r = {
            success: true,
            message: 'none'
        };
        return r;
    };
    this.validateAlphanumeric = function (alphanumeric) {
        var myRegEx = /[^a-z\d]/i;
        var isValid = !(myRegEx.test(alphanumeric));
        return isValid;
    };
    this.validateTestPattern = function (alphanumeric, pattern) {
        var myRegEx = pattern;
        var isValid = !(myRegEx.test(alphanumeric));
        return isValid;
    };
    this.drawError = function (lx_cm, error) {
        $('[lx_cm ="' + lx_cm + '"]').addClass('form-control-error');
        $('#' + lx_cm + '_Ast').addClass('form-text-error');
        $('#' + lx_cm + '_mini').addClass('form-text-error').show().html(error);
    };
    this.resetField = function (lx_cm) {
        $('[lx_cm ="' + lx_cm + '"]').removeClass('form-control-error');
        $('#' + lx_cm + '_Ast').removeClass('form-text-error');
        $('#' + lx_cm + '_mini').removeClass('form-text-error').hide().html('');
    };
    this.validateMinNumber = function (el, item, textsErr) {
        var MSGERR = 'Number is grather than _XX_ ';
        var r = {};
        var val = $('[lx_cm ="' + item.lx_cm + '"]').val();
        if (textsErr.ErrMinNum) {
            MSGERR = textsErr.ErrMinNum;
        }

        if (item.type === 'number' && val !== '' && item.minNumber) {
            if (val < Number(item.minNumber)) {
                r = {
                    success: false,
                    message: MSGERR.replace('_XX_', item.minNumber)
                };
                return r;
            }
        }
        r = {
            success: true,
            message: 'none'
        };
        return r;
    };
    this.validateMaxNumber = function (el, item, textsErr) {
        var MSGERR = 'Number is less than _XX_ ';
        var r = {};
        var val = $('[lx_cm ="' + item.lx_cm + '"]').val();
        if (textsErr.ErrMaxNum) {
            MSGERR = textsErr.ErrMaxNum;
        }

        if (item.type === 'number' && val !== '' && item.maxNumber) {
            if (val > Number(item.maxNumber)) {
                r = {
                    success: false,
                    message: MSGERR.replace('_XX_', item.maxNumber)
                };
                return r;
            }
        }
        r = {
            success: true,
            message: 'none'
        };
        return r;
    };
    this.validatePassword = function (el, item, textsErr) {
        var MSGERR = 'Password format incorrect';
        var r = {};
        var val = $('[lx_cm ="' + item.lx_cm + '"]').val();
        if (textsErr.ErrPass) {
            MSGERR = textsErr.ErrPass;
        }
        if (item.type === 'password' && val !== '') {
            var RPR = 0;
            if (item.minNumAlph) {

                var ocur1 = (val.match(/[a-z]/g) || []).length;
                ocur1 = ocur1 + (val.match(/[A-Z]/g) || []).length;

                if (ocur1 < item.minNumAlph) {
                    RPR++;

                }
            }
            if (item.minNumEspChar) {
                var ocur2 = (val.match(/[._!+@#$%{}:;><^&*/]/g) || []).length;
                if (ocur2 < item.minNumEspChar) {
                    RPR++;

                }
            }
            if (item.minNumNum) {
                var ocur3 = (val.match(/[0-9]/g) || []).length;

                if (ocur3 < item.minNumNum) {
                    RPR++;

                }
            }
            if (RPR > 0) {
                r = {
                    success: false,
                    message: MSGERR
                };
                return r;
            }
        }
        r = {
            success: true,
            message: 'none'
        };
        return r;
    };
    this.validateMail = function (el, item, textsErr) {
        var MSGERR = 'Email format incorrect';
        var r = {};
        var val = $('[lx_cm ="' + item.lx_cm + '"]').val();
        if (textsErr.ErrMail) {
            MSGERR = textsErr.ErrMail;
        }
        if (item.type === 'email' && val !== '') {
            var RPR = 0;
            if (!val.includes('.')) {
                RPR++;
            }
            if (!val.includes('@')) {
                RPR++;
            }
            if (val.includes('.@')) {
                RPR++;
            }
            if (val.includes('@.')) {
                RPR++;
            }

            if (val.includes('@')) {
                var ls = val.split('@');
                if (!ls[1].includes('.')) {
                    RPR++;
                }
            }


            if (RPR > 0) {
                r = {
                    success: false,
                    message: MSGERR
                };
                return r;
            }
        }
        r = {
            success: true,
            message: 'none'
        };
        return r;
    };
    this.disableCopyPaste = function (lx_cm) {
        $('[lx_cm ="' + lx_cm + '"]').on("cut copy paste", function (e) {
            e.preventDefault();
        });
    };
    this.CutDecimals = function (number, decimals) {
        if (!decimals) {
            decimals = 2;
        }

        if (number.toString().includes('.')) {

            var cad = number.toString();
            var Arr = cad.split('.');

            if (Arr[1].length > decimals) {
                cad = Arr[1].substr(0, decimals)

                return (Arr[0] + '.' + cad).toString();
            } else {

                cad = Arr[1].toString();
                var F = decimals - Arr[1].length;

                for (var i = 0; i < F; i++) {
                    cad = cad + '0';
                }
                return (Arr[0] + '.' + cad).toString();
            }
        } else {
            if (Number(decimals) === 0) {

                var X = Math.trunc(Number(number));
                return X.toString();
            } else {

                var cad = number.toString();
                cad = cad + '.';
                for (var i = 0; i < decimals; i++) {
                    cad = cad + '0';
                }
                return (cad).toString();
            }
        }
    };
};