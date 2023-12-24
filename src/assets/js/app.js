import { placeholder } from "../js/placeholders.js";
import { inputCheck } from "../js/inputCheck.js";



const inputs = document.querySelectorAll('input.review')
const button = document.querySelector('.sbt > button')


const checkInput = (value,msg,parent,name,input) => {
 
    if(value==false && !parent.contains(document.querySelector(`.wrong_${name}`))) {
        const wrongInput = document.createElement('div')
        wrongInput.textContent = msg
        wrongInput.classList.add(`wrong_${name}`)
        parent.appendChild(wrongInput)
        input.target.style.borderColor = 'hsl(0, 100%, 66%)'
        
      
    }
    
    else {
    
    if(parent.contains(document.querySelector(`.wrong_${name}`)) && value==true ) {
            const wrongInput = document.querySelector(`.wrong_${name}`)  
            parent.removeChild(wrongInput)
            input.target.style.borderColor = ''
    
        }
    }
    
    }
    
    

inputs.forEach(input => {
    input.addEventListener('keyup',e => {
        const reviewInput = document.querySelector(`.${e.target.id}`)
        if(e.target.id=='crd_number_review' && e.target.value.length>0) {
           const cardNm =  e.target.value.match(/\w{1,4}/g)
           reviewInput.textContent = cardNm.join(' ')
           e.target.value = cardNm.join(' ')

        }
       
        else {
            reviewInput.textContent = e.target.value.toUpperCase()
        }
        if(e.target.value.length==0) {
            reviewInput.textContent = placeholder[e.target.id].text
        }
            
    })
    input.addEventListener('focusout',e => {
        let parentElement = e.target.parentNode
        const errMsg = inputCheck[e.target.id].errMsg

        if(e.target.id=='crd_number_review') {
           /^[0-9 ]*$/gi.test(e.target.value) 
           ? checkInput(true,errMsg,parentElement,e.target.id,e) 
           : checkInput(false,errMsg,parentElement,e.target.id,e) 
           }
           else if (e.target.id == 'name_review') {
            /^[a-zA-Z ığüşöçĞÜŞÖÇİ]*$/gi.test(e.target.value) 
            ? checkInput(true,errMsg,parentElement,e.target.id,e) 
            : checkInput(false,errMsg,parentElement,e.target.id,e) 
           }
          else if(e.target.id=='mm') {
            parentElement = document.querySelector('.exp-wrong-area');
            /^(0[1-9]|1[0-2])$/gi.test(e.target.value) 
            ? checkInput(true,errMsg,parentElement,e.target.id,e) 
            : checkInput(false,errMsg,parentElement,e.target.id,e)
            }
            else if(e.target.id=='yy') {
                parentElement = document.querySelector('.exp-wrong-area');
                /^(2[4-9]|3[0-5])/gi.test(e.target.value) 
                ? checkInput(true,errMsg,parentElement,e.target.id,e) 
                : checkInput(false,errMsg,parentElement,e.target.id,e) 
                }
            else if(e.target.id='cvc') {
                /^[0-9]{3,4}$/gi.test(e.target.value) 
                ? checkInput(true,errMsg,parentElement,e.target.id,e) 
                : checkInput(false,errMsg,parentElement,e.target.id,e) 
            }
    })
  
})

button.addEventListener('click', e => {
    const formArea = document.querySelector('.form-area')
    const name = document.querySelector('#name_review')
    const cardNumber = document.querySelector('#crd_number_review')
    const mm = document.querySelector('#mm')
    const yy = document.querySelector('#yy')
    const cvc = document.querySelector('#cvc')
    
    if(/^[a-zA-Z ığüşöçĞÜŞÖÇİ]*$/gi.test(name.value)==true && name.value.length > 0 &&  /^[0-9 ]*$/gi.test(cardNumber.value)==true && cardNumber.value.length>0 && /^(0[1-9]|1[0-2])$/gi.test(mm.value)==true && mm.value.length>0 &&  /^(2[4-9]|3[0-5])/gi.test(yy.value)==true && yy.value.length>0 &&  /^[0-9]{3,4}$/gi.test(cvc.value)==true && cvc.value.length > 0) {
        // After confirm card details 
        document.querySelector('.card-input').removeChild(formArea)
        const form = document.createElement('div')
        form.classList.add('form-area')
        form.innerHTML = `
        <div class="success-area"> 
        <div class="msg-area">
        <div class="success-logo"> <img src="src/assets/images/icon-complete.svg"> </div>
        <div class="thanks-msg"> THANK YOU! </div>
        <div class="success-info"> We've added your card details </div>
        </div>
        <div class="btn"> <button class="continue-btn"> Continue </button>
        </div>
        
        `
        document.querySelector('.card-input').appendChild(form)
        const continueBtn = document.querySelector('.continue-btn')
        continueBtn.addEventListener('click', () =>{
            location.reload()
        })

        

    }
    
})

