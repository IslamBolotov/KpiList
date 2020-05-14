$(document).ready(function(){


    chart()
    podium()

    $('.btn-add').on('click',function(){
       $('.main-modal').fadeIn()
    })

    const setItemToStorage = taskObj =>{
        if(!localStorage.getItem('tasks-data')){
            localStorage.setItem('tasks-data','[]')
        }
        const storageTaskData = JSON.parse(localStorage.getItem('tasks-data'));
        storageTaskData.push(taskObj)
        localStorage.setItem('tasks-data',JSON.stringify(storageTaskData));
     
    }

    $('.search-inp').on('keyup', function(event){
        let value = $(this).val().toLowerCase()
        if(value==''){
            return paginationShow(thisPage1,thisPage2) 
        }
        const storageTaskData = JSON.parse(localStorage.getItem('tasks-data'));
        console.log(storageTaskData);
        let arrPag =[]
        storageTaskData.filter(item =>{
            if(item.name.toLowerCase().includes(value) ||item.surname.toLowerCase().includes(value)){
                arrPag.push(item)
            }
        })
        renderData1(arrPag)
        console.log(value);
        
    })

    var thisPage1=1 //тек. страница 1 таблицы
    var thisPage2=1 // тек. страница 2 таблицы
    var nx = 0;

    function paginationShow(thisPage1,thisPage2){
        let data = JSON.parse(localStorage.getItem('tasks-data'))
        let len = Math.ceil((data.length/10))
        let arrPag =[];
        let arrPag2 =[];
        let arrPag3 =[];

        let count1 = thisPage1*10// 20  11 
        let count2 = thisPage2*10

        data.forEach((item,i) =>{
            $('.for-new-btn').html('')
            $('.for-new-btn1').html('')
            if(i<count1 && i>=(count1-10) && nx==0){ 
                arrPag.push(item)
            }
            if(i<count1 && i>=(count1-10) && nx==1){ 
                arrPag2.push(item)
            }
            if(i<count2 && i>=(count2-10) && nx==2){ 
                arrPag3.push(item)
            }
        })
        if(data.length>10 || thisPage1 > 1 ||thisPage2>1){

            $('.for-new-btn').append(`
            <h3>Page  ${thisPage1}  of  ${len}</h3>
            <button class="previous1"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
            <button class="next1"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
            
            `)

            $('.for-new-btn1').append(`
            <h3>Page  ${thisPage2}  of  ${len}</h3>
            <button class="previous2"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
            <button class="next2"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
            
            `)
        }
        if(nx==0){
            renderData1(arrPag)
            renderData2(arrPag)
        }
        else if(nx==1){
            renderData1(arrPag2);
        }
        else if(nx==2){
            renderData2(arrPag3)
        }

    }

    $('body').on('click','.next1',function(){

        let data = JSON.parse(localStorage.getItem('tasks-data'))
        let len = Math.ceil((data.length/10))
        nx=1;
        if(thisPage1 >= len)  return
            $('.for-new-btn').html('')
            thisPage1+=1;
            paginationShow(thisPage1,thisPage2)
    })

    $('body').on('click','.next2',function(){

        let data = JSON.parse(localStorage.getItem('tasks-data'))
        let len = Math.ceil((data.length/10))
        nx=2;
        if(thisPage2 >= len)  return
            $('.for-new-btn').html('')
            thisPage2+=1;
            paginationShow(thisPage1,thisPage2)
    })

    $('body').on('click','.previous1',function(){
        
        nx=1;
        if(thisPage1>1){
            thisPage1-=1;
            $('.for-new-btn').html('')   
            paginationShow(thisPage1,thisPage2)
        }
        else{return}
    })
    $('body').on('click','.previous2',function(){
        
        nx=2;
        if(thisPage2>1){
            thisPage2-=1;
            $('.for-new-btn').html('')   
            paginationShow(thisPage1,thisPage2)
        }
        else{return}
    })



    paginationShow(thisPage1,thisPage2)


    function renderData1(data){
        //let data = JSON.parse(localStorage.getItem('tasks-data'))

        if(!data){
            return
        }
        $('.main-tbody').html('');
        data.forEach((item) => { 
            $('.main-tbody').append(`
                <tr>
                    <td class="picture"><img src=${item.photo} class="picture-ph"></td>
                    <td class="name">${item.name}</td>
                    <td class="surname">${item.surname}</td>
                    <td class="age">${item.age}</td>
                    <td class="email">${item.email}</td>
                    <td class="phone">${item.phone}</td>
                    <td class"btn-ide">
                        <button class="btn-info"><i class="fa fa-info-circle" aria-hidden="true"></i></button>
                    </td>   
                    <td class"btn-ide">
                        <button class="btn-delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    </td>
                    <td class"btn-ide">
                        <button class="btn-change"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                    </td>
                </tr>
            `)
       
        });
        
    }
    function renderData2(data){
        //let data = JSON.parse(localStorage.getItem('tasks-data'))

        if(!data){
            return
        }
        $('.second-tbody').html('');
        data.forEach((item) => { 
            $('.second-tbody').append(`
                <tr>
                    <td class="picture"><img src=${item.photo} class="picture-ph"></td>
                    <td class="name">${item.name}</td>
                    <td class="surname">${item.surname}</td>
                    <td class="late">${item.late}</td>
                    <td class="tasks">${item.tasks}</td>
                    <td class="interview">${item.interview}</td>
                    <td class="presentation">${item.presentation}</td>
                    <td class="extra">${item.extra}</td>
                    <td class="total">${item.total}</td>
                    <td class"btn-ide">
                        <button class="btn-change"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                    </td>
                </tr>
            `)
        });
        
    }

    $('body').on('click','.btn-change', function(){
        $('.btn-change').removeClass('buttoned');
        $(this).addClass('buttoned');

        const storageTaskData = JSON.parse(localStorage.getItem('tasks-data'))
        let index = $('.buttoned').closest('tr').index();
        if($('.buttoned').closest('tr').parent().parent().hasClass('listOfStudents')){
            
            index = index +(thisPage1*10)-10
            console.log(index);
            
        }
        if($('.buttoned').closest('tr').parent().parent().hasClass('KPI-list')){

            index = index +(thisPage2*10)-10
            console.log(index);
            
        }
       
        storageTaskData.forEach((element,i) =>{
            if(i===index){
                $('.modal-change').append(`
                        <button class="close-change-modal"><i class="fa fa-window-close-o" aria-hidden="true"></i></button>
                        <h4>Имя</h4>
                        <input type="text" class="name-modal-inp new-inp" value="${element.name}">
                        <h4>Фимилия</h4>
                        <input type="text" class="surName-modal-inp new-inp" value="${element.surname}">
                        <h4>Возраст</h4>
                        <input type="text" class="age-modal-inp new-inp" value="${element.age}">
                        <h4>Email</h4>
                        <input type="text" class="email-modal-inp new-inp" value="${element.email}">
                        <h4>phone</h4>
                        <input type="text" class="phone-modal-inp new-inp" value="${element.phone}">
                        <h4>Ссылка на фото</h4>
                        <input type="text" class="photo-modal-inp new-inp" value="${element.photo}">
                        
                        <h4>Late</h4>
                        <input type="text" class="late-modal-inp new-inp" value="${element.late}">
                        <h4>Task score</h4>
                        <input type="text" class="tasks-modal-inp new-inp" value="${element.tasks}">
                        <h4>Interview</h4>
                        <input type="text" class="interview-modal-inp new-inp" value="${element.interview}">
                        <h4>Presentaion</h4>
                        <input type="text" class="presentation-modal-inp new-inp" value="${element.presentation}">
                        <h4>Extra</h4>
                        <input type="text" class="extra-modal-inp new-inp" value="${element.extra}">

                        <h4><button class="ok-change-btn">Изменть</button></h4>
                `)
            }
        })
        $('.main-modal-change').fadeIn()
    })
    $('body').on('click','.ok-change-btn', function(){
            let valueN = $('.name-modal-inp').val();
            let valueSn = $('.surName-modal-inp').val();
            let valueA = $('.age-modal-inp').val();
            let valueE = $('.email-modal-inp').val();
            let valuephone = $('.phone-modal-inp').val();
            let valuePh = $('.photo-modal-inp').val();
            let valueLate =$('.late-modal-inp').val();
            let valueTask=$('.tasks-modal-inp').val();
            let valueInterview =$('.interview-modal-inp').val();
            let valuePresentation=$('.presentation-modal-inp').val();
            let valueExtra =$('.extra-modal-inp').val();
            let valueTotal =parseInt(valueLate) + parseInt(valueTask) + parseInt(valueInterview) + parseInt(valuePresentation) + parseInt(valueExtra);


        if(!valueN || !valueSn ||!valueA ||!valueE ||!valuephone ||!valuePh || !valueLate|| !valueTask ||!valueInterview||!valuePresentation ||!valueExtra ){
            alert('Заполните поле!')
            return
        }
        else{
            const storageTaskData = JSON.parse(localStorage.getItem('tasks-data'))
            let index = $('.buttoned').closest('tr').index();
           
        if($('.buttoned').closest('tr').parent().parent().hasClass('listOfStudents')){
            
            index = index +(thisPage1*10)-10
            console.log(index);
            
        }
        if($('.buttoned').closest('tr').parent().parent().hasClass('KPI-list')){

            index = index +(thisPage2*10)-10
            console.log(index);
            
        }
            storageTaskData.forEach((element,i) =>{
                if(i===index){
                    element.name = valueN;
                    element.surname = valueSn;
                    element.age = valueA;
                    element.email = valueE;
                    element.phone = valuephone;
                    element.photo = valuePh;
                    element.late = valueLate;
                    element.tasks = valueTask;
                    element.interview = valueInterview;
                    element.presentation = valuePresentation;
                    element.extra = valueExtra;
                    element.total = valueTotal

                }
            })
            
                localStorage.setItem('tasks-data',JSON.stringify(storageTaskData))
                nx=0
                paginationShow(thisPage1,thisPage2);
                chart()
                podium()
    
                $('.modal-change').html('')
                $('.main-modal-change').fadeOut(); 
            
        }
    })


    $('body').on('click','.btn-delete', function(){
        const storageTaskData = JSON.parse(localStorage.getItem('tasks-data'))
        
        $('.btn-change').removeClass('buttoned');
        $(this).addClass('buttoned');

        let index = $('.buttoned').closest('tr').children('.email').text();
        console.log(index);
        console.log(storageTaskData);
        storageTaskData.forEach((item,i) =>{
            if(item.email ==index){
                storageTaskData.splice(i,1)
                return
            }
        })
       // storageTaskData.splice(index,1);
        localStorage.setItem('tasks-data',JSON.stringify(storageTaskData));
        nx = 1
        paginationShow(thisPage1,thisPage2);
        chart()
        podium()
    })

    $('body').on('click','.btn-info', function(){
        let i = $(this).closest('tr').index();
        
        let name = $(this).closest('tr').children('.name').text()
        let surname = $(this).closest('tr').children('.surname').text()
        let age = $(this).closest('tr').children('.age').text()
        let email = $(this).closest('tr').children('.email').text()
        let phone = $(this).closest('tr').children('.phone').text()
        let picture = $(this).closest('tr').children('.picture').children().attr('src');
        let total = $('.KPI-list').children().children('tr').eq(i+1).children('.total').text()
        console.log(total);
        
        $('.mod-in').html('')
        $('.mod-in').append(`
            <div class="dd">Имя: ${name}</div>
            <div class="dd">Фамилия: ${surname}</div>
            <div class="dd">Возраст: ${age}</div>
            <div class="dd">Эл. адрес: ${email}</div>
            <div class="dd">Телефон: ${phone}</div>
            <div class="dd">KPI: ${total}</div>
            <div class="images"><img src=${picture} width="200px"></div>
            <button class="close-info"><i class="fa fa-window-close-o" aria-hidden="true"></i></button>
        `)
        
         $('.modal-info').fadeIn()

    })

    $('.ok-btn').on('click',function(){
        let valueN = $('.name-inp').val();
        let valueSn = $('.surName-inp').val();
        let valueA = $('.age-inp').val();
        let valueE = $('.email-inp').val();
        let valuephone = $('.phone-inp').val();
        let valuePh = $('.photo-inp').val();
        let valueLate =0;
        let valueTask=0;
        let valueInterview =0;
        let valuePresentation=0;
        let valueExtra =0;
        let valueTotal =parseInt(valueLate) + parseInt(valueTask) + parseInt(valueInterview) + parseInt(valuePresentation) + parseInt(valueExtra);

        if(!valueN || !valueSn ||!valueA ||!valueE ||!valuephone ||!valuePh ){
            alert('Заполните поле!')
            return
        }


        const taskObj = {
            name: valueN,
            surname: valueSn,
            age: valueA,
            email: valueE,
            phone: valuephone,
            photo: valuePh,
            late: valueLate,
            tasks: valueTask,
            interview: valueInterview,
            presentation: valuePresentation,
            extra: valueExtra,
            total: valueTotal

        };
        $('.name-inp').val('');
        $('.surName-inp').val('');
        $('.age-inp').val('');
        $('.email-inp').val('');
        $('.phone-inp').val('');
        $('.photo-inp').val('');
        $('.main-modal').fadeOut()
        nx = 0
        setItemToStorage(taskObj);
        paginationShow(thisPage1,thisPage2)
        chart()
        podium()
    })
    //renderData()
    $('.close-modal').on('click', () => { $('.main-modal').fadeOut()})

    $('body').on('click','.close-info', () =>{ $('.modal-info').fadeOut() })

    $('body').on('click','.close-change-modal', () => {
        $('.modal-change').html('')
        $('.main-modal-change').fadeOut()
    })

    function chart(){
    var ctx = document.getElementById('myChart').getContext('2d');
    const storageTaskData = JSON.parse(localStorage.getItem('tasks-data'))
    var arrtotal = [];
    var arrName = [];
    storageTaskData.forEach((item,i) => {
        arrName.push(item.name)
        arrtotal.push(item.total)
    })

        var chart = new Chart(ctx, {

            
            // The type of chart we want to create
            type: 'bar',
        
            data: {
                labels: arrName,
                datasets: [{
                    label: 'KPI',
                    backgroundColor: 'green',
                    borderColor: 'black',
                    data: arrtotal,
                }]
            },
        
            // Configuration options go here
            options: {option}
        });
        var option = {
            showLines: true
        };
    }

    function podium(){

        $('.podium').html('')
        const storageTaskData = JSON.parse(localStorage.getItem('tasks-data'))
        let arrpodium =[];
        let arrName = [];
        let arrPhoto = [];
        let arrSurname =[];

        storageTaskData.forEach((item,i) => {
            arrpodium.push(item.total)
        })
    
        arrpodium.sort((a,b) => {return b-a})
       
        storageTaskData.forEach((item,i) => {
            if(arrpodium[0]==item.total){
                arrName.push(item.name)
                arrPhoto.push(item.photo)
                arrSurname.push(item.surname)
            }
        })
        storageTaskData.forEach((item,i) => {
            if(arrpodium[1]==item.total){
                arrName.push(item.name)
                arrPhoto.push(item.photo)
                arrSurname.push(item.surname)
            }
        })
        storageTaskData.forEach((item,i) => {
            if(arrpodium[2]==item.total){
                arrName.push(item.name)
                arrPhoto.push(item.photo)
                arrSurname.push(item.surname)
            }
        })
        $('.podium').append(`
            <img src="./picture/main.jpg" alt="" class="podium-img">
        `)
        $('.podium').append(`
            <img src='${arrPhoto[0]}'  class="podium-photo-1 animated bounceInDown">
        `)
        $('.podium').append(`
            <img src='${arrPhoto[1]}'  class="podium-photo-2 animated bounceInLeft">
        `)

        $('.podium').append(`
            <img src='${arrPhoto[2]}'  class="podium-photo-3 animated bounceInRight">
            
        `)
    
        
    }   
   
})

