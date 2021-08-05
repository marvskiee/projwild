function Gallery(){
  this.parent = document.querySelector('.carousel-images');
  this.content = document.querySelector('.carousel-content');
  this.list = document.querySelector('.carousel-list');
  let onmove = false;
  let pos_down = 0;
  let pos_up = 0;
  let offset = 0;
  this.num = 1; 
  let data = null;

  Object.defineProperty(this, 'data',{
    get: function(){
      return data;
    },
    set: function(value){
      data = value;     
    }
  })
  Object.defineProperty(this,'pos_down',{
    get: function(){
     return pos_down;
    },
    set: function(value){
      pos_down = value;
    }
   });
  Object.defineProperty(this,'pos_up',{
   get: function(){
    return pos_up
   },
   set: function(value){
     pos_up = value;
   }
  });
  Object.defineProperty(this, 'onmove',{
    get: function(){
      return onmove;
    },
    set: function(value){
      onmove = value;
    }
  });
  Object.defineProperty(this, 'offset',{
    get: function(){
      return offset;
    },
    set: function(value){
      offset = value;
    }
  })
}

Gallery.prototype.init = function(){
  this.fetchData();
  this.parent.addEventListener('mousedown',(e)=>this.down(e));
  this.parent.addEventListener('mouseup',(e)=>this.up(e));
  this.parent.addEventListener('mousemove',(e)=>this.move(e));

  this.parent.addEventListener('touchstart',(e)=>this.down(e));
  this.parent.addEventListener('touchend',(e)=>this.up(e));
  this.parent.addEventListener('touchmove',(e)=>this.move(e));
  
}
Gallery.prototype.fetchData = function(){
  let linkimg = document.querySelector('#citations-image > div');
  let self = this;
  let xhttp = new XMLHttpRequest();
  xhttp.onload = function(){
    // console.log(this.responseText);
    let data = JSON.parse(this.responseText);
    self.data = data;
    // console.log(data);
    for(let d in data){
      self.parent.children[0].innerHTML += `<img draggable="false" src="/assets/images/${data[d]['image']}" alt="">`;
      self.list.innerHTML += `<div></div>`;
      linkimg.innerHTML += `<p>${data[d]['linkImg']}</p>`
    }
    self.content.children[0].innerHTML = self.data[0]['name'];
    self.content.children[1].innerHTML = self.data[0]['description'];
    self.list.children[0].classList.add('active');
  }
  xhttp.open('GET','https://wildpath.000webhostapp.com/assets/json/career.json');
  xhttp.send();
}
Gallery.prototype.clearList = function(){
  let list = Array.from(this.list.children);
  list.forEach((el,index)=>{
    if(el.classList.contains('active')){
      el.classList.remove('active');
    }
  });
}
Gallery.prototype.up = function(e){
  const max = this.data.length;
  let pos = document.querySelector('.carousel-images > div');
  // let width = document.querySelector('.carousel-images > img');
  const cardwidth = this.parent.clientWidth;
  this.onmove = false;
  
    // 50 - 25 positive || 25 - 50 negative
    if(this.pos_up!=0){
      if(this.pos_down < this.pos_up&&this.num>1){
        this.num--;
        this.offset = this.offset + cardwidth;
        this.content.children[0].innerHTML = this.data[this.num - 1]['name'];
        this.content.children[1].innerHTML = this.data[this.num - 1]['description'];
        this.clearList();
        this.list.children[this.num-1].classList.add('active');
        // console.log('prev');
        // NEGATIVE OR PREV
      }
      if(this.pos_down > this.pos_up&&this.num<max){
        this.num++;
        this.offset = this.offset + (cardwidth * (-1));
        // console.log('next');
        // POSITIVE OR NEXT
        this.content.children[0].innerHTML = this.data[this.num - 1]['name'];
        this.content.children[1].innerHTML = this.data[this.num - 1]['description'];
        this.clearList();
        this.list.children[this.num-1].classList.add('active');
        // console.log(this.content.children);
      }
      pos.style.left = `${this.offset}px`;
    }
}

Gallery.prototype.down = function(e){ 
  console.log('down');
  this.onmove = true;
  this.pos_up = 0;
  if(e.pageX!=undefined){
    this.pos_down = e.pageX;
  }else{
    this.pos_down = e.touches[0].pageX;
  }
}

Gallery.prototype.move = function(e){
  if(this.onmove){
    if(e.pageX !=undefined){
      this.pos_up = e.pageX;
    }else{
      this.pos_up = e.touches[0].pageX;
    }
  }
}

const gallery = new Gallery();
gallery.init();