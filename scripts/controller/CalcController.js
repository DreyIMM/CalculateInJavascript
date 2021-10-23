class CalcControler{

    constructor(){
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcE1 = document.querySelector("#display");
        this._dateE1 = document.querySelector("#data");
        this._timeE1 = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
    }


    initialize(){
        
        this.setDisplayDateTime();

        setInterval(()=>{
        
            this.setDisplayDateTime();

        }, 1000);
        this.setLastNumberToDisplay();
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

    calc(){
        let last = '';
        if(this._operation.length > 3){
            last = this._operation.pop();
        }

        
        let result = eval(this._operation.join(""));

        if(last == '%'){

            result /= 100
            this._operation = [result];


        }else{
              
            this._operation = [result];

            if(last) this._operation.push(last);

        }

        this.setLastNumberToDisplay();
    }

    setLastNumberToDisplay(){
    
        let lastNumber;

        for(let i = this._operation.length -1; i>=0; i--){
            if(!this.isOperation(this._operation[i])){
                lastNumber = this._operation[i];
                break;
            }
        }

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
                this.setlastOperation(parseInt(newValue));

                //Atualizar display

                this.setLastNumberToDisplay()


            }           
        }
        
    }



    execBtn(value){

        switch (value) {

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
                this.addOperation(".");
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
        this._displayCalcE1.innerHTML = value;
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }

}