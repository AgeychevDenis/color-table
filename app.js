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
      save = document.querySelector('.table__btn-save'),
      clearData = document.querySelector('.table__btn-close'),
      blockColors = document.querySelector('.block__colors');

   const colorsList = [
      { name: "Мятное утро", type: "Main", color: '#86EAE9' },
      { name: "Лавандовый пунш", type: "Side", color: '#B8B2DD' },
      { name: "Морозное небо", type: "Side", color: '#00bfff' }
   ];

   //===Сохранение, удаление LocalStorage==========================================================================================================

   save.addEventListener('click', () => {
      if (saveColorsList) {
         localStorage.setItem('colorsListLocalStorage', JSON.stringify(saveColorsList));
      } else {
         localStorage.setItem('colorsListLocalStorage', JSON.stringify(colorsList));
      }
      alert('Данные сохранены');
   });

   let saveColorsList = JSON.parse(localStorage.getItem('colorsListLocalStorage'));

   if (saveColorsList) {
      createColorsList(saveColorsList, addRows, blockColors);
   } else {
      createColorsList(colorsList, addRows, blockColors);
   }

   clearData.addEventListener('click', () => {
      let isDelete = confirm("Вы уверены, что хотите удалить данные?")
      if (isDelete) {
         localStorage.clear();
      }
   })

   //--------------------------------------------------------------------------------------------------------------------------------------

   //====Добавление нового цвета в таблицу=================================================================================================

   addForm.addEventListener('submit', (event) => {
      event.preventDefault();

      let newName = inputName.value;
      const newType = selectType.textContent,
         newColor = `#${сolorText.textContent}`;

      if (newName !== '') {
         if (newName.length > 12) {
            newName = `${newName.substring(0, 13)}...`
         }

         if (saveColorsList) {
            saveColorsList.push({ name: newName, type: newType, color: newColor });
            createColorsList(saveColorsList, addRows, blockColors);
         } else {
            colorsList.push({ name: newName, type: newType, color: newColor });
            createColorsList(colorsList, addRows, blockColors);
         }

         bodyPicker.classList.remove('active');

      } else {
         alert('Введите название цвета!')
      }
   });

   //--------------------------------------------------------------------------------------------------------------------------------------

   //====Функция создание списка таблицы===================================================================================================

   function createColorsList(arr, parent, parentBlockColor) {
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


      // Добавлнение нового цвета в .block__colors
      parentBlockColor.innerHTML = '';
      arr.forEach(elem => {
         parentBlockColor.innerHTML += `
         <div style="background-color: ${elem.color};"></div>
         `
      })

      // Удаление строки в таблице
      document.querySelectorAll('.delete').forEach((btn, i) => {
         btn.addEventListener('click', () => {
            btn.parentElement.remove();
            colorsList.splice(i, 1);
         });
      });
   }

   //--------------------------------------------------------------------------------------------------------------------------------------

   //===Изменение типа Select(Main, Primary, Secondary, Base)===и открытие добавление цвета================================================

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

   //--------------------------------------------------------------------------------------------------------------------------------------
})