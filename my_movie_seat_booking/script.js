
const container=document.querySelector('.container');
const seats=document.querySelectorAll('.row .seat:not(.occupied)');//return nodelist
const count=document.getElementById('count');
const total=document.getElementById('total');
const movieSelect=document.getElementById('movie');

populateUI();

let ticketPrice= +movieSelect.value;

//本地浏览器数据缓存，保存已选择的电影下标和加个
function setMovieData(movieIndex,moviePrice){
	localStorage.setItem('selectedMovieIndex',movieIndex);
	localStorage.setItem('selectedMoviePrice',moviePrice);
}


//更新总数和总价格，更新时的工作需要再次保存至localStorage中
function updateSelectedCount(){
	const selectedSeats=document.querySelectorAll('.row .seat.selected');//nodelist

	//选出没被占用的椅子里被选中的椅子的index
	const seatsIndex=[...selectedSeats].map(seat=>[...seats].indexOf(seat));//map()requires an array rather than nodelist.and that's why we don't use [selectedSeats]

	localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));//localstorage只接受字符串

	const selectedSeatsCount=selectedSeats.length;

	count.innerText=selectedSeatsCount;
	total.innerText=selectedSeatsCount*ticketPrice;

	setMovieData(movieSelect.selectedIndex,movieSelect.value);//这一步才真正起到更新作用，这里的selectedIndex属性来自于populateUI()
}

//从localstorage里获取数据
function populateUI(){
	const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));

	if(selectedSeats!==null&selectedSeats.length>0){  
		seats.forEach((seat,index)=>{   //对未被占用的座位且在浏览器的selectedSeats缓存中，说明被选中
			if(selectedSeats.indexOf(index)>-1){
				seat.classList.add('selected');
			}
		});
	}

	//从浏览器缓存获取selectedMovieIndex传给代码层
	const selectedMovieIndex=localStorage.getItem('selectedMovieIndex');

	if(selectedMovieIndex!==null){
		movieSelect.selectedIndex=selectedMovieIndex;
	}
}

//事件监听，基本是需要click的场合
movieSelect.addEventListener('change',e=>{
	ticketPrice= +e.target.value;
	setMovieData(e.target.selectedIndex,e.target.value);
	updateSelectedCount();
});

container.addEventListener('click',e=>{
	//没被占据，就实现点击后selected，再次点击后cancel
	if(e.target.classList.contains('seat')&&!e.target.classList.contains('occupied')){
		e.target.classList.toggle('selected');
		updateSelectedCount();
	}
});

updateSelectedCount();
