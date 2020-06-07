var i=0
var len
var obj
var score =0
var body =document.querySelector('body')

function func(){
    body.style.backgroundColor="#FFE082"
    var no =document.getElementById('number').value
    var category =document.getElementById('category').value
    var difficulty = document.getElementById('difficulty').value

    var div = document.getElementById('inp')
    div.innerHTML=''
    
    var xhr = new XMLHttpRequest(); 
    xhr.open('GET','https://opentdb.com/api.php?'+'amount='+no+'&category='+category+"&difficulty="+difficulty+"&type=multiple")
    xhr.send()
    xhr.onload=function(){
      obj = JSON.parse(xhr.response)['results']
      len=obj.length
      
     create(obj)   
    }
}

function create(obj) {
    console.log(obj)

        var div =document.getElementById('res')
        div.innerHTML=''
        var div_inner = document.createElement('div')
        div_inner.setAttribute('id','div_inner')
        var arr=[]
        var correct_ans =obj[i].correct_answer

        //pushing correct answer in array
        arr.push(correct_ans)
        
        //pushin incorrect anwers in array
        for(var j=0;j<obj[i].incorrect_answers.length;j++){
            arr.push(obj[i].incorrect_answers[j])
        }
        //shuffling array for input choices
        var shuffled_arr =shuffle(arr)

        //element creation and appending

        var h2= document.createElement('h2')
        h2.innerHTML ="Question "+(i+1)+"- "+obj[i].question
        
        var choice1 = document.createElement('button')
        choice1.innerHTML =shuffled_arr[0]
        choice1.addEventListener('click',function(){check(choice1,correct_ans)})

        var choice2 = document.createElement('button')
        choice2.innerHTML =shuffled_arr[1]
        choice2.addEventListener('click',function(){check(choice2,correct_ans)})

        var choice3 = document.createElement('button')
        choice3.innerHTML =shuffled_arr[2]
        choice3.addEventListener('click',function(){check(choice3,correct_ans)})

        var choice4 = document.createElement('button')
        choice4.innerHTML =shuffled_arr[3]
        choice4.addEventListener('click',function(){check(choice4,correct_ans)})
        div_inner.append(choice1,choice2,choice3,choice4)
        div.append(h2,div_inner)
        
    

}

function check(chosen,correct){
    i++
    if(chosen.innerHTML==correct){
        console.log("Correct")
        console.log(chosen)
        chosen.setAttribute('id','correct')
        score++
    }
    else{
        console.log("incorrect")
        console.log(chosen)
        chosen.setAttribute('id','incorrect')
    }

    if(i<len){
        setTimeout(function(){ create(obj) },1000)
    }
    else{
        setTimeout(function(){
            body.innerHTML=''
            winner()
        },1000)
        
    }
}



//shuffling functions
function shuffle(arr){
    for(var j=0;j<arr.length-1;j++){
        var random = Math.floor(Math.random()*(arr.length))
        var temp=arr[j]
        arr[j]=arr[random]
        arr[random]=temp
    }
    return arr
}


function winner(){
    var div =document.createElement('div')
    div.setAttribute('id','final')
    div.textContent="Your Score : "+score+"/"+(i)
    body.append(div)
    
}