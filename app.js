"use strict";

document.addEventListener('DOMContentLoaded', () => {
   const addColorBtn = document.querySelector('.picker__btn'),
      addTableBtn = document.querySelector('.table__btn-add'),
      addForm = document.querySelector('form'),
      inputName = document.getElementById('input_name-color'),
      selectType = document.querySelector('.picker__select-type'),
      сolorText = document.querySelector('.picker__res'),
      addRows = document.getElementById('table');

   const colorsList = [
      { name: "Мятное утро", type: "main", color: '#86EAE9' },
      { name: "Лавандовый пунш", type: "side", color: '#B8B2DD' },
      { name: "Морозное небо", type: "side", color: '#00bfff' }
   ]


   addForm.addEventListener('submit', (event) => {
      event.preventDefault();

      let newName = inputName.value;
      const newType = selectType.textContent,
         newColor = `#${сolorText.textContent}`;

      if (newName !== '') {
         if (newName.length > 12) {
            newName = `${newName.substring(0, 13)}...`
         }

         colorsList.push({ name: newName, type: newType, color: newColor });
         createColorsList(colorsList, addRows);
      } else {
         alert('Введите название цвета!')
      }


   })

   console.log(сolorText);

   function createColorsList(arr, parent) {
      parent.innerHTML = '';

      arr.forEach(elem => {
         parent.innerHTML += `
         <tr class="element">
            <td><span style="background-color: ${elem.color};"></span></td>
            <td>${elem.name}</td>
            <td>${elem.type}</td>
            <td>${elem.color}</td>
            <td class="pencil icon-edit-2">
            </td>
            <td class="delete icon-basket">
            </td>
         </tr>
         `
      });

      document.querySelectorAll('.delete').forEach((btn, i) => {
         btn.addEventListener('click', () => {
            btn.parentElement.remove();
            colorsList.splice(i, 1);
         });
      });
   }

   createColorsList(colorsList, addRows);

})