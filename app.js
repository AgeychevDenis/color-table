"use strict";

window.addEventListener('DOMContentLoaded', () => {
   const addTableBtn = document.querySelector('.table__btn-add'),
      addForm = document.querySelector('form'),
      addRows = document.getElementById('table'),
      inputName = document.getElementById('input_name-color'),
      selectType = document.querySelector('.picker__select-type'),
      сolorText = document.querySelector('.picker__res'),
      selectPopup = document.querySelectorAll('.picker__select-popup li'),
      bodyPicker = document.querySelector('.body__picker'),
      save = document.querySelector('.table__btn-save');

   const colorsList = [
      { name: "Мятное утро", type: "Main", color: '#86EAE9' },
      { name: "Лавандовый пунш", type: "Side", color: '#B8B2DD' },
      { name: "Морозное небо", type: "Side", color: '#00bfff' }
   ];

   save.addEventListener('click', () => {
      localStorage.setItem('colorsList', JSON.stringify(colorsList));
      alert('Данные сохранены')
   })

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

      bodyPicker.classList.remove('active');

   })

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

   selectType.addEventListener('click', (e) => {
      e.target.classList.add('active');
   });

   selectPopup.forEach(li => {
      li.addEventListener('click', (e) => {
         selectType.textContent = e.target.textContent;
         selectType.classList.remove('active');
      })
   });

   addTableBtn.addEventListener('click', () => {
      bodyPicker.classList.add('active');
   })
})