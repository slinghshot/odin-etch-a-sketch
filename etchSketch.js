const parentContainer = document.getElementById('parentContainer');
const etchingStatus=document.getElementById('status');
let subContainer;
let numberOfSubContainers=16;
var mouseDown=0;
var eraser=false;
var rainbowSelected=false;

// The event below checks for a click on parent div if clicked fill else don't
parentContainer.addEventListener('mousedown',function(){
    if(mouseDown){
        mouseDown=0;
        parentContainer.style.cssText="border: 2px solid grey";
        
    }else{
        mouseDown=1;
        // parentContainer.style.cssText="border: 10px solid green";
        parentContainer.style.cssText="box-shadow: 0 0 20px rgb(79, 193, 228)";
    }
});

drawEtchBoard();


function drawEtchBoard(){
    for(let i=0;i<numberOfSubContainers;i++){
    subContainer=document.createElement('div');
    subContainer.setAttribute("id",`subContainer${i}`);
    subContainer.style.display="flex";
    parentContainer.appendChild(subContainer);
    }

    //get number of subContainers and times by 4 to get 4*subcontainers.
    // but since we know number of subcontainers.
    let idAppendNum=0;
    for(let i=0;i<numberOfSubContainers;i++){
        let subContainer =document.getElementById(`subContainer${i}`);
        // console.log(subContainer);
        for(let j=0;j<numberOfSubContainers;j++){
            subContainerContent=document.createElement('div');
            // subContainer.style.cssText="";
            /*
                20px; 16
                10px; 32
                2px   ; 48
            */
            // let heightPerSqr=numberOfSubContainers/
            // subContainerContent.style.height=`10px`;
            subContainerContent.classList.add('spaceDivs');
            
            idAppendNum+=1;
            subContainerContent.setAttribute('id',`subContainerContent${idAppendNum}`);
            subContainerContent.textContent="";
            subContainer.appendChild(subContainerContent);
        }
    }
}

function deleteChildElements(){
    var parentContainerDivs=document.querySelector('#parentContainer');
    var child = parentContainerDivs.lastElementChild;
    // console.log(child);
    while(child){
        parentContainerDivs.removeChild(child);
        child=parentContainerDivs.lastElementChild;
    }
}

const divContainers=document.querySelectorAll('#parentContainer');


divContainers.forEach(container=>container.addEventListener('mouseover', function(e){
    if(mouseDown){
        if(e.target.id=='parentContainer'){
            return;
        }
        if(eraser){
            e.target.classList.remove('divHighlighted');
        }else{
            e.target.classList.add('divHighlighted');
        }
    }
}));


function clearScreen(){
    idAppendNum=0;
    mouseDown=0;
    for(let i=0;i<numberOfSubContainers;i++){
        for(let j=0;j<numberOfSubContainers;j++){
            idAppendNum+=1;
            subContainerContent=document.getElementById(`subContainerContent${idAppendNum}`);
            subContainerContent.classList.remove('divHighlighted');
        }
    }
}
document.getElementById('clearScreenBtn').addEventListener("click",clearScreen)
document.getElementById('eraserBtn').addEventListener("click",function(e){
    if(eraser){
        eraser=false;
        e.target.classList.remove('buttonToggle');
    }else{
        eraser=true;
        e.target.classList.add('buttonToggle');
    }
    mouseDown=0;
})

var slider = document.getElementById("gridSize");
var output = document.getElementById('textSlider');
output.innerHTML=`${slider.value} x ${slider.value}`;
slider.oninput =function(){
    output.innerHTML=`${this.value} x ${this.value}`;
    deleteChildElements();
    numberOfSubContainers=this.value;
    drawEtchBoard();
}