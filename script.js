
const enrolledBox = document.querySelector('.courses-box')
let savedCourses = JSON.parse(localStorage.getItem('courses')) || [];
let myBio = JSON.parse(localStorage.getItem('bio')) || [];



const bioInput = document.querySelector('.user-input');
if (bioInput) {
    bioInput.addEventListener('blur', function (){
            localStorage.setItem('bio', JSON.stringify(bioInput.value));
    });
}



if (enrolledBox) {

    displayEnrolledCourses()
    bioInput.value = myBio
}



document.querySelectorAll('.book1').forEach(book => {

    book.addEventListener('mouseenter', function () {
        let popOption = this.querySelector('.img-option')
        const img = this.querySelector('img');
        const imgSrc = img?.src || '';
        const fileName = imgSrc.split('/').pop().split('.')[0];
        const toAdd = {
            book: fileName
        }
        console.log(toAdd)
        if (!popOption) {

            popOption = document.createElement('div')
            popOption.className = 'img-option'
            popOption.innerHTML = `<img src="assets/addcourse/icon.png" alt="" class='addthiscourse'>
                                <img src="assets/addcourse/Vector.png" alt="">
                                <img src="assets/addcourse/Frame.png" alt="">`;


            this.appendChild(popOption)
        }

        popOption.style.display = 'flex'



        popOption.querySelector('.addthiscourse').addEventListener('click', function () {

            if (!savedCourses.some(c => c.book === toAdd.book)) {
                savedCourses.push(toAdd)
                localStorage.setItem('courses', JSON.stringify(savedCourses))
            }


            displayEnrolledCourses()


        })
    })

    book.addEventListener('mouseleave', function () {
        const popOption = this.querySelector('.img-option');
        if (popOption) popOption.style.display = 'none';
    });
})


function displayEnrolledCourses() {
    enrolledBox.innerHTML = savedCourses.map((book) => {

        return (`
           <div class="book-enrolled">
              <img src="assets/MAIN PAGE/${book.book}.png" alt="" />
            </div>
            `)
    }).join('');

    const addCourseButton = `   <div class="add-course">
              <a href="addcourse.html"><img src="assets/MAIN PAGE/addcourse.png" alt="" /></a>

            </div>
`

    enrolledBox.insertAdjacentHTML('beforeend', addCourseButton)
}








function removeEnrolledCourse(book) {
    const bookName = book.querySelector('img').src.split('/').pop().split('.')[0];
    savedCourses = savedCourses.filter(c => c.book !== bookName);
    localStorage.setItem('courses', JSON.stringify(savedCourses));

}












// book option popup
document.querySelectorAll('.book-enrolled').forEach(book => {
    book.addEventListener('mouseenter', function () {

        let popOption = this.querySelector('.enrolled-pop-option');

        if (!popOption) {
            const img = this.querySelector('img');
            const imgSrc = img?.src || '';
            const fileName = imgSrc.split('/').pop().split('.')[0];
            popOption = document.createElement('div');
            popOption.className = 'enrolled-pop-option';
            popOption.innerHTML = `
        <a href="bookspage/${fileName}book.html"><i class="fa-solid fa-eye"></i></a>
        <i class="fa-solid fa-circle-minus remove-icon" ></i>
      `;
            this.appendChild(popOption);
        }

        popOption.style.display = 'flex';

        const removeIcon = popOption.querySelector('.remove-icon');
        removeIcon.addEventListener('click', function () {
            book.remove();
            removeEnrolledCourse(book)
        })
    });

    book.addEventListener('mouseleave', function () {
        const popOption = this.querySelector('.enrolled-pop-option');
        if (popOption) popOption.style.display = 'none';
    });


});





