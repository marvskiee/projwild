function Menu(){
    this.togglebtn = document.getElementById('menu-toggle');
    this.content = document.querySelector('.menu');
    this.homebtn = document.querySelector('a[href="#home"]');
    this.logobtn = document.querySelector('.logo');
}
Menu.prototype.init = function(){
    this.togglebtn.addEventListener('click', ()=>this.toggle(this));
    this.homebtn.addEventListener('click', ()=>this.scrolltop(this));
    this.logobtn.addEventListener('click', ()=>this.scrolltop(this));
}
Menu.prototype.scrolltop = function(){
    window.scroll({
        top:0
    });
}
Menu.prototype.toggle = function(){
    let self = this;
    this.togglebtn.classList.toggle('menu-close');
    this.content.classList.toggle('active');
    if(this.content.classList.contains('active')){
        let child = Array.from(this.content.children);
        child.forEach((el,id)=>{
            el.addEventListener('click',function(){
                let test = window.getComputedStyle(self.togglebtn);
                if(test.getPropertyValue('display')=='block'){
                    self.content.classList.toggle('active',false);
                }
            });
        });
    }
}

function Article(){
    this.xhttp = new XMLHttpRequest();
    this.list = document.getElementById('articles-list');   
    this.citation = document.querySelector('#citations-article > div');
    this.content = document.getElementById('article-content');
    this.body = document.body;
}
Article.prototype.init = function(){
    let self = this;
    this.xhttp.onload = function(){
        let data = JSON.parse(this.responseText);
        for(let d in data){
            self.list.innerHTML += `<li id="a-${d}">${data[d]['name']}</li>`;
            self.citation.innerHTML += `<p>${data[d]['source']}</p>`;
        }
    
        const article_button = document.querySelectorAll('#articles-list li');
        article_button.forEach((el, index)=>{
            if(el != null || el != undefined){
                el.addEventListener('click', ()=>self.open(data[index]));
            }
        });
        
    }
    this.xhttp.open('GET','https://api.jsonbin.io/b/610b7c16f098011544ab8a04',true);
    this.xhttp.send();
}
Article.prototype.open = function(data){
    this.body.style.overflow = 'hidden';
    let self = this;
    this.content.style.display = 'block';
    this.content.innerHTML = 
    `<div>
        <h3>${data.name}</h3>
        <img id="btn-article-close" src="assets/images/icon/x.svg" alt =""/>
    </div>
    <div id="article-author">
        By ${data.author}
    </div>
    <div>
    ${data.content}</div>`
    let close = document.getElementById('btn-article-close');
    if(close!=null){
        close.addEventListener('click',()=>self.close());
    }
}
Article.prototype.close = function(){
    this.body.style.overflow = 'auto';
    this.content.scrollTop = '0';
    this.content.style.display = 'none';
    this.content.innerHTML = '';
}

const article =  new Article();
article.init();

const menu = new Menu();
menu.init();
