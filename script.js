$(function () {
    var lastPressed = '';
    var coma = false;
    $('.num').click(function () {
        var value = $(this).val();
        var firstChar = $('#result').text().substring(0, 1);
        var secondChar = $('#result').text().substring(1, 2);
        var isZero = false;

        firstChar === '0' ? isZero = true : isZero = false;
        if (lastPressed == 'opr' && secondChar !== '.') {
            $('#result').html(value);
        }
        else {
            if (isZero && secondChar !== '.') {
                $('#result').html(value);
            }
            else {
                $('#result').append(value);
            }
        }
        lastPressed = 'num';

    });
    $('.specialOpr').click(function(){
        var value = $(this).val();
        var result = $('#result').text();
        var firstChar = result.substring(0, 1);
        
        if(value == '.' && !coma){

            if(lastPressed == 'opr'){
                $('#result').html('0.'); 
            }
            else{
               $('#result').append('.'); 
            }
            
            lastPressed = '.';
            coma = true;
        }
        else if(value == '+/-'){
            if($.isNumeric(firstChar)){
                $('#result').prepend('-'); 
            }
            else{
                $('#result').html(result.substring(1,result.length));
            }
            lastPressed = 'opr';
        }
        
    });
    $('.opr').click(function () {
        var value = $(this).val();
        var operand = $('#result').text();

        var lastChar = $('#progress').text();
        lastChar = lastChar.substring(lastChar.length - 1, lastChar.length);


        if( value == 'CE' ){
            $('#result').html('0');
        }
        else if(value == 'C'){
            $('#progress').html('');
            $('#result').html('0');
        }
        else if(value == '<--'){
            if (operand.length > 1) {
                $('#result').html(operand.substring(0, operand.length - 1));
            }
            else {
                $('#result').html(0);
            }
        }
        else if (value == '÷' || value == 'x' || value == '+' || value == '-'){
            if (lastPressed == 'num') {
                var progress = $('#progress').text();
                progress += $('#result').text();
                number1 = '';
                number2 = '';
                var opr = '';
                for (var i = 0; i < progress.length + 1; i++) {
                    if(progress[i] == '-' && i == 0){
                        number1 += progress[i];
                    }
                    else if (($.isNumeric(progress[i]) || progress[i] == '.') && opr === '' && number2 === '') {                      
                        number1 += progress[i];                        
                    }
                    else if (progress[i] === '÷' || progress[i] === '+' || progress[i] === '-' || progress[i] === 'x') {
                        opr = progress[i];
                    }
                    else if (($.isNumeric(progress[i]) || progress[i] == '.') && opr !== '') {
                        number2 += progress[i];
                    }
                    else if (number1 !== '' && opr !== '' && number2 !== '') { // yang dikali dan dibagi 10000 ini spy ga ancur angka e karena javascript ga akurat 100% hitungannya
                        if (opr == '+') {
                            number1 = parseFloat(number1) + parseFloat(number2 );
                        }
                        else if (opr == '-') {
                            number1 = (parseFloat(number1 * 10000) - parseFloat(number2 * 10000)) / 10000;
                        }
                        else if (opr == '÷') {
                            number1 = parseFloat(number1 * 10000) / parseFloat(number2 * 10000);
                        }
                        else if (opr == 'x') {
                            number1 = parseFloat(number1) * parseFloat(number2);
                        }
                        number2 = '';
                    }
                }
                $('#result').html(number1);
                $('#progress').append(' ' + operand + ' ' + value);
            }
            else {
                $('#progress').html(operand + '  ' + value);
            }
        }
        else if(value == '='){
            if (lastChar == '=') {
                var lastResult = $('#result').text();
                var progress = $('#progress').text();
                progress += $('#result').text();
                var tempResult = '';
                var lastNumber = '';
                var lastOpr = '';
                var done = false;
                for (var i = progress.indexOf('='); !done; i--) {

                    if (($.isNumeric(progress[i] || progress[i] == '-') || progress[i] == '.')) {
                        lastNumber = progress[i] + lastNumber;
                    }
                    else if (progress[i] == '÷' || progress[i] == '+' || progress[i] == '-' || progress[i] == 'x') {
                        lastOpr = progress[i];
                        done = true;
                    }
                }

                if (lastOpr == '+') {
                    tempResult = parseFloat(lastResult) + parseFloat(lastNumber);
                }
                else if (lastOpr == '-') {
                    tempResult = (parseFloat(lastResult * 10000) - parseFloat(lastNumber * 10000))/10000;
                }
                else if (lastOpr == '÷') {
                    tempResult = parseFloat(lastResult * 10000) / parseFloat(lastNumber * 10000);
                }
                else if (lastOpr == 'x') {
                    tempResult = parseFloat(lastResult) * parseFloat(lastNumber);
                }
                $('#progress').html(lastResult + ' ' + lastOpr + ' ' + lastNumber + ' =');
                $('#result').html(tempResult);
            }
            else {
                var progress = $('#progress').text();
                progress += $('#result').text();
                number1 = '';
                number2 = '';
                var opr = '';
                
                for (var i = 0; i < progress.length + 1; i++) {

                    if(progress[i] == '-' && i == 0){
                        number1 += progress[i];
                    }
                    else if (($.isNumeric(progress[i]) || progress[i] == '.') && opr === '' && number2 === '') {                      
                            number1 += progress[i];                        
                    }
                    else if (progress[i] === '÷' || progress[i] === '+' || progress[i] === '-' || progress[i] === 'x') {
                        opr = progress[i];
                    }
                    else if (($.isNumeric(progress[i]) || progress[i] == '.') && opr !== '') {
                        number2 += progress[i];
                    }
                    else if (number1 !== '' && opr !== '' && number2 !== '') {
                       
                        if (opr == '+') {
                            number1 = parseFloat(number1) + parseFloat(number2 );
                        }
                        else if (opr == '-') {
                            number1 = (parseFloat(number1 * 10000) - parseFloat(number2 * 10000)) / 10000;
                        }
                        else if (opr == '÷') {
                            number1 = parseFloat(number1 * 10000) / parseFloat(number2 * 10000);
                        }
                        else if (opr == 'x') {
                            number1 = parseFloat(number1) * parseFloat(number2);
                        }
                        number2 = '';
                    }
                }
                $('#result').html(number1);
                $('#progress').append(' ' + operand + ' =');
            }
        }
        lastPressed = 'opr';
        coma = false;
    });
});