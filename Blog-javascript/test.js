let blogPosts = document.getElementById('output-container')
let listOfPosts = []

printPosts();

function printPosts(){

console.log(getCookies())

var getPosts = getCookies()


if(getPosts){
  var cookiePost = getPosts.replace("[]", "")
  
var cookieArray = JSON.parse(cookiePost);

if(listOfPosts.length === 0){

  console.log("Jag går in här");
  cookieArray.forEach((post)=>{
    listOfPosts.push(post)
  })
}

for(let i=0; i < listOfPosts.length; i++){
      createOuterWrapper(i)
      getDate(i)
      printName(i, cookieArray[i].Name)
      printTitle(i, cookieArray[i].Title)
      printPost(i, cookieArray[i].Post)     
    }
  }
}

function printName(number, name) {
  if (!name) {
    return
  }
  createElemets('name-container-' + number, 'name-text-' + number, number)
  document.getElementById('name-text-' + number).innerHTML = name 
}

function getDate(count) {
  createElemets('date-container-' + count, 'date-text-' + count, count)
  let date = new Date()
  let dateElement = document.getElementById('date-text-' + count, 'date-text')
  dateElement.setAttribute('required', '')
  dateElement.innerHTML = date.toDateString()
  return date
}

function printTitle(count, title) {
  if (!title) {
    return
  }
  createElemets('title-container-' + count, 'title-text-' + count, count, 'title-text')
  document.getElementById('title-text-' + count).innerHTML = title  
}

function printPost(count, post) {
  if (!post) {
    return
  }
  createElemets('post-container-' + count, 'blog-post-' + count, count, 'post-text')
  document.getElementById('blog-post-' + count).innerHTML = post  
}

function createElemets(divID, pID, count, className) {
  let nameContainer = document.createElement('div')
  nameContainer.setAttribute('id', divID)
  document.getElementById('output-wrapper-' + count).appendChild(nameContainer)
  if(className === 'post-text'){
    let textContainer = document.createElement('textarea')
    textContainer.setAttribute('id', pID)
    textContainer.setAttribute('class', className)
    textContainer.setAttribute('readonly','')
    textContainer.setAttribute('rows', '20')
    textContainer.setAttribute('cols', '50')
    nameContainer.appendChild(textContainer)
  }
  else{
    let textContainer = document.createElement('p')
    textContainer.setAttribute('id', pID)
    textContainer.setAttribute('class', className)
    nameContainer.appendChild(textContainer)
  }
}

function createOuterWrapper(count) {
  document.getElementById('output-wrapper-'+ count) && document.getElementById('output-wrapper-'+ count).remove()
  let outputWrapper = document.createElement('div')
  outputWrapper.setAttribute('id', 'output-wrapper-' + count)
  outputWrapper.setAttribute('class', 'output-wrapper')
  let counter = Number(count) -1 
  document.getElementById('output-container').insertBefore(outputWrapper, document.getElementById('output-wrapper-'+ counter))
}

function printBlogPost() {
  let name = document.getElementById('name-text-input')
  let title = document.getElementById('title-text-input')
  let post = document.getElementById('blog-post-input')

  if(name.value && title.value && post.value){
   
    createListOfPosts(name, title, post);   
    
  }
  else{
    alert("You have to fill all the inputs before saving")
  }
  
  name.value = "";
  title.value = "";
  post.value = "";
}

function createListOfPosts(name, title, post){

  let date = new Date()    
  let postObject = {"Name": name.value, "Date" : date.toDateString(), "Title" :title.value, "Post" : post.value};    
  listOfPosts.push(postObject);
  setCookie(JSON.stringify(listOfPosts), 30 );
  printPosts();
}

function setCookie(value, days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = " expires=" + date.toUTCString();
  }
  document.cookie = (value || "") + "; " + expires + "; path=/"
}

function getCookies() {
  var cookies = document.cookie.split(';');
  var ret = '';
  for(var i = 1; i <= cookies.length; i++) {
      ret += cookies[i - 1];
  }
  return ret;
}




