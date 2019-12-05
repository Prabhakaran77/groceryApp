var product;
var units;
var unit_price;
var price;
var rowNo=0;
const ITEM_NAME='item_name';
const UNIT='unit';
const UNITS='units';
const UNIT_PRICE='unit_price';
const PRICE='price';
const DISPLAY='display';
const PRODUCT='product';
function add()
{
    //creating new row with new data cells and buttons
    var newTd1=document.createElement('td');
    var newTd2=document.createElement('td');
    var newTd3=document.createElement('td');
    var newTd4=document.createElement('td');
    var newTd5=document.createElement('td');
    var editButton=document.createElement('button');
    var deleteButton=document.createElement('button');
    var newTr=document.createElement('tr');
    var table=document.querySelector('table');
    var buttonName1 = document.createTextNode("Edit");
    var buttonName2 = document.createTextNode("Delete");

    //setting attributes for buttons and data cells
    editButton.appendChild(buttonName1);
    editButton.setAttribute("class","edit")
    editButton.setAttribute("onclick","edit("+rowNo+")");
    deleteButton.appendChild(buttonName2);
    deleteButton.setAttribute("onclick","deleteRow("+rowNo+")"); 
    newTd1.textContent=product;
    newTd1.setAttribute("class","product");
    newTd2.textContent=parseInt(units);
    newTd2.setAttribute("class","units");
    newTd3.textContent=unit_price;
    newTd3.setAttribute("class","unit_price");
    newTd4.textContent=price;
    newTd4.setAttribute("class","price");
    newTd5.appendChild(editButton);
    newTd5.appendChild(deleteButton);  
    newTr.setAttribute("id",rowNo); 

    // adding the new elements
    table.appendChild(newTr);
    newTr.appendChild(newTd1);
    newTr.appendChild(newTd2);
    newTr.appendChild(newTd3);
    newTr.appendChild(newTd4);
    newTr.appendChild(newTd5);
    rowNo++;
    grandTotal();//updating grand total after adding a row
}

function createRow()
{
    product=document.getElementById(ITEM_NAME).value;
    units=document.getElementById(UNIT).value;
    unit_price=document.getElementById(UNIT_PRICE).value;
    //input validation
    if(product==""||units==""||unit_price=="")
    {
        alert("fields cant be empty");
    }
    else if(isNaN(units)||units<0||isNotInt(units))
    {
        alert("enter valid units")
    }
    else if(isNaN(unit_price)||unit_price<0)
    {
        alert('enter valid unit price');
    }
    else
    {
    price=parseInt(units)*parseFloat(unit_price);
    price=price.toFixed(2);
    add();
    }
}
function deleteRow(id)
{
    var row=document.getElementById(id);
    row.remove();
    grandTotal();//updating grand total after deleting a row
}

function edit(id)
{
    var row=document.getElementById(id);
    row.setAttribute("contentEditable",true);
    document.getElementById(id).childNodes[4].innerHTML="<input type='button' name='save' value='Save' id='savebtn' onclick='save("+id+")'/>";
}

function save(id)
{
    var unit=document.getElementById(id).getElementsByClassName(UNITS);
    var unit_price=document.getElementById(id).getElementsByClassName(UNIT_PRICE);
    var item=document.getElementById(id).getElementsByClassName(PRODUCT); 
    if(unit[0].textContent==""||unit_price[0].textContent==""||item[0].textContent=="")
    {
        alert("fields cant be empty");
    }
    else if(isNaN(unit[0].textContent)||unit[0].textContent<0||isNotInt(unit[0].textContent))
    {
        alert("enter valid unit");
    }
    else if(isNaN(unit_price[0].textContent)||unit_price[0].textContent<0)
    {
        alert('enter valid unit price');
    }
    else
    {
    var price=parseInt(unit[0].textContent)*parseFloat(unit_price[0].textContent);
    price=price.toFixed(2);
    var edit_price=document.getElementById(id).getElementsByClassName(PRICE);
    edit_price[0].textContent=price;
    document.getElementById(id).setAttribute("contentEditable",false);
    grandTotal();//updating grand total after editing the row
    document.getElementById(id).childNodes[4].innerHTML="<input type='button' name='edit' id='editbtn' value='Edit' onclick='edit("+id+")'/>"+"<input type='button' name='delete' id='deletebtn' value='Delete' onclick='deleteRow("+id+")'/>";
    }
}

function grandTotal()
{
    var grandtotal=0;
    var total= document.getElementsByClassName(PRICE);
    for(var i=0;i<total.length;i++)
    {
        grandtotal+= parseFloat(total[i].textContent);
    }
    grandtotal=grandtotal.toFixed(2);
    document.getElementById(DISPLAY).value=grandtotal;
}
function isNotInt(n)
{
    var number=parseInt(n);
    if(number==n)
    return false;
    else
    return true;
}