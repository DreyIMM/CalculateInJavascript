class CalcControler{

    constructor(){
        this._audio = new Audio('click.mp3')
        this._lastOperator = '';
        this._lastNumber = '';

        this._audioOnOff = false;

        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcE1 = document.querySelector("#display");
        this._dateE1 = document.querySelector("#data");
        this._timeE1 = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
        this.initKeyboard();
        
    }


   

    initialize(){
        
        this.setDisplayDateTime();

        setInterval(()=>{
        
            this.setDisplayDateTime();

        }, 1000);
        this.setLastNumberToDisplay();
        this.pastFromClipboard();
       
        document.querySelectorAll(".btn-ac").forEach(btn =>{
            
            btn.addEventListener('dblclick', e=>{
              
                this.toggleAudio();

            })

        })
    }

    toggleAudio(){



        this._audioOnOff = !this._audioOnOff;
        // Utiliza-se o de cima para diminuir o codigo
        // if(this._audioOnOff){

        //     this._audioOnOff = false
        
        // }else{

        //     this._audioOnOff = true;
        
        // }

    }

    playAudio(){
        if(this._audioOnOff){
            this._audio.currentTime =0;
            this._audio.play()
            
        }
       
       
    }

    //Esse metodo permite que o contéudo dentro do disPlayCalc seja copiado para o contr c do computador, e remove o input inserido
    copyToClipboard(){
        let input = document.createElement('input');
        input.value = this.displayCal;

        document.body.appendChild(input);

        input.select();

        document.execCommand("Copy");

        input.remove();
    }

    // Esse metodo permite que o usuario cole, event "PASTE" numeros (int e float e envie direito para o displayCalc)
    pastFromClipboard(){

        document.addEventListener('paste', e=>{
           
            let text = e.clipboardData.getData('Text')
            this.displayCal = parseFloat(text)
        })
    }

    initKeyboard(){
        document.addEventListener('keyup', e=>{
            this.playAudio();                
            switch (e.key) {
              case "Escape":
                this.clearAll();
                break;
              case "Backspace":
                this.clearEntry();
                break;
              case "+":
              case "-":
              case "*":
              case "/":
              case "%":
                this.addOperation(e.key);
                break;
              case "Enter":
              case "=":      
                this.calc();
                break;
              case ".":
              case ",":
                this.addDot(".");
                break;
              case "0":
              case "1":
              case "2":
              case "3":
              case "4":
              case "5":
              case "6":
              case "7":
              case "8":
              case "9":
                this.addOperation(parseInt(e.key));
                break;
              case "c":
                  if(e.ctrlKey) this.copyToClipboard();
                break;
            }
        
        })

    }

    getLastOperation(){
    
        return this._operation[this._operation.length - 1];
    
    }
  

    // Está funcão permite que o evento EventListener suporte mais de um evento. (No caso o events é enviado um array, e depois tratado)
    addEventListenerAll(element, events, fn){

        events.split(' ').forEach(event =>{

            element.addEventListener(event, fn, false);

        })

    }
     

    pushOperation(value){
        this._operation.push(value)

        if(this._operation.length >3){

            this.calc();

        }

    }

    getResult(){
        try {
          return eval(this._operation.join(""));
        } catch {
          setTimeout(() => {
            this.setError();
          }, 1);
        }  
    }


    calc(){

        let last = '';

        this._lastOperator = this.getLastItem()
        
        if(this._operation.length < 3){

            let fristItem = this._operation[0];
            this._operation = [fristItem, this._lastOperator, this._lastNumber];

        }


        if(this._operation.length > 3){   

            last = this._operation.pop();
            this._lastNumber = this.getResult();

        }else if(this._operation.length == 3){
            
            this._lastNumber = this.getLastItem(false);
        }

        console.log("Ultimo operador " , this._lastOperator);
        console.log("Ultimo numero", this._lastNumber);

        let result = this.getResult();
        

        if(last == '%'){

            result /= 100
            this._operation = [result];


        }else{
              
            this._operation = [result];

            if(last) this._operation.push(last);

        }

        this.setLastNumberToDisplay();
    }

    getLastItem(isOperador = true){

        let lastItem;
        for(let i = this._operation.length -1; i>=0; i--){
         
            if(this.isOperation(this._operation[i]) == isOperador){
                    lastItem = this._operation[i];
                    break;
            }
          
        }

        if(!lastItem){
            lastItem = (isOperador) ? this._lastOperator : this._lastNumber;
        }

        return lastItem;
    }

    setLastNumberToDisplay(){
    
        let lastNumber = this.getLastItem(false);
        
        
        if(!lastNumber) lastNumber = 0 ;

        this.displayCal = lastNumber;

    }

    addOperation(value){
        // console.log("A" , value, isNaN(this.getLastOperation()))
    
        
        if(isNaN(this.getLastOperation())){
            //String

            if(this.isOperation(value)){
                //Trocar operador

                this.setlastOperation(value);
                
            }else if(isNaN(value)){
                //Outra coisa
               console.log("Outra coisa= " ,value)
            }else{

                this.pushOperation(value)
                this.setLastNumberToDisplay()
            }

        }else{
            //Se o this.getLasOperation é um Number

            if(this.isOperation(value)){

                this.pushOperation(value)

            }else{

                let newValue = this.getLastOperation().toString() + value.toString();
                this.setlastOperation(newValue);

                //Atualizar display

                this.setLastNumberToDisplay()


            }           
        }
        
    }
    //Esta função permite adicionar o dot(.) para operação
    addDot(){
        
    let lastOperation = this.getLastOperation();


       if(typeof lastOperation == 'string' && lastOperation.split('').indexOf('.') > -1) return;
       
       if( this.isOperation(lastOperation) || !lastOperation){

           this.pushOperation('0.');
           
       }else{

           this.setlastOperation(lastOperation.toString() + '.')
      
        }

       this.setLastNumberToDisplay();


    }

    execBtn(value){

        this.playAudio();

        switch(value) {

            case "ac":
                this.clearAll();
                break;
            case "ce":
                this.clearEntry();
                break;
            case "soma":
                this.addOperation("+");
                break;
            case "subtracao":
                this.addOperation("-");
                break;
            case "divisao":
                this.addOperation("/");
                break;
            case "multiplicacao":
                this.addOperation("*");
                break;
            case "porcento":
                this.addOperation("%");
                break;
            case "igual":
                this.calc();
                break;
            case "ponto":
                this.addDot(".");
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':   
            case '9':
                this.addOperation(parseInt(value));
                break;
            default:
                this.setError();
                break;
        }
    }

    // metodo para incializar os buttons. 
    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts >g");

        buttons.forEach((btn)=>{
            // BTN representa cada button
            
            this.addEventListenerAll(btn ,'click drag', e=>{
                let textBtn = btn.className.baseVal.replace("btn-", "");

                this.execBtn(textBtn);
            })

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e =>{
                btn.style.cursor = "pointer"
            })

        })
    }
    

    setError(){
        this.displayCal = "Error "
    }

    clearAll(){
        this._operation = []
        this._lastNumber = []
        this.lastOperation = []
        this.setLastNumberToDisplay();
    }

    clearEntry(){
        this._operation.pop()
        this.setLastNumberToDisplay();
    }

    setlastOperation(value){
        this._operation[this._operation.length - 1] = value;
    }

    isOperation(value){
        return (["+" , "-", "%", "*" ,"/"].indexOf(value) > -1)
           
    }

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale);
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayTime(){
        return this._timeE1.innerHTML;
    }

    set displayTime(value){
        this._timeE1.innerHTML = value;
    }

    get displayDate(){
        return this._dateE1.innerHTML;
    }

    set displayDate(value){
        this._dateE1.innerHTML = value;
    }


    get displayCal(){
        return  this._displayCalcE1.innerHTML;
    }

    set displayCal(value){
        if(value.toString().length > 10){
            this.setError();
            return false;
        }
        this._displayCalcE1.innerHTML = value;
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }

}