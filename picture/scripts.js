const displayimage=document.querySelector('.image');
const overlay=document.querySelector('.overlay');
const btn=document.querySelector('button.dark');
const imgbar=document.querySelector('.image-bar');
const textshow=document.querySelector('.text-show');
const allhtml=document.querySelector('html');

const images=['img4.jpg','img1.png','img2.jpg','img3.png','img.jpg'];
const alts={
    'img4.jpg':'易烊千玺',
    'img1.png':'满江红',
    'img2.jpg':'送你一朵小红花',
    'img3.png':'长津湖',
    'img.jpg':'音乐专辑《刘艳芬》'
}

const textContents={
    'img4.jpg':'易烊千玺，2000年11月28日出生于湖南省怀化市洪江市，毕业于中央戏剧学院，TFBOYS成员，中国内地影视男演员、流行乐歌手、舞者。其主演犯罪电影《少年的你》提名奥斯卡最佳国际影片奖，主演战争电影《长津湖》问鼎中国影史票房冠军，挑大梁的电影《送你一朵小红花》《奇迹·笨小孩》亦取得超十亿票房成绩，并连续三年提名中国电影金鸡奖最佳男主角奖。',
    'img1.png':'《满江红》讲述了南宋绍兴年间，岳飞死后四年，秦桧率兵与金国会谈。会谈前夜，金国使者死在宰相驻地，所携密信也不翼而飞。一个小兵与亲兵营副统领机缘巧合被裹挟进这巨大阴谋之中，宰相秦桧命两人寻找凶手和真相的故事。2024年1月14日，该片摘得2023年微博之夜年度影响力电影的桂冠；2月又荣获第42届香港电影金像奖最佳亚洲华语电影的提名。在影片中，易烊千玺饰演的角色是一位勇敢而充满理想的年轻人。他在面对家国的动荡与困境时，展现了坚定的信念和无私的奉献精神。易烊千玺成功地捕捉到了角色的内心世界，通过细腻的情感表达，让观众感同身受。他在影片中的动作场面表现出色，流畅且充满力量，展现了刻苦的训练和对角色的投入。观众普遍对他的表现给予了高度评价，认为他突破了自身的偶像形象，展现出了实力派演员的潜质。',
    'img2.jpg':'《送你一朵小红花》是由韩延编剧并执导，易烊千玺、刘浩存、朱媛媛、高亚麟、夏雨、岳云鹏主演的剧情片。于2020年12月31日在中国大陆上映。该片以两个勇敢面对癌症的家庭为叙事背景，讲述了因长期与脑瘤抗争而形成悲观孤僻性格的韦一航，在同样罹患脑瘤的伙伴马小远的积极鼓舞和支持下，逐渐走出了内心的阴霾，重新与家人朋友建立了深厚的情感联系的故事。《送你一朵小红花》获得第36届大众电影百花奖最佳故事片提名，第19届华表奖优秀故事片。截至2021年1月10日票房累积达到10亿元。',
    'img3.png':'《长津湖》是由陈凯歌、徐克、林超贤联合执,兰晓龙、黄建新编剧,吴京、易烊千玺领衔主演,段奕宏、欧豪特别出演,朱亚文、李晨、胡军、韩东君等主演的历史战争电影。该片于2021年9月30日在中国大陆上映。该片以抗美援朝战争第二次战役中的长津湖战役为背景，讲述了在极寒严酷环境下，中国人民志愿军东线作战部队凭着钢铁意志和英勇无畏的战斗精神，扭转战场态势，为长津湖战役胜利作出重要贡献的故事。2021年11月24日,该片累计票房(含预售)超过56.95亿人民币,成为中国影史票房冠军。2022年7月30日,该片在第36届大众电影百花奖中获得“最佳影片” 。2023年5月,获得第十九届中国电影华表奖优秀导演、优秀电影音乐。',
    'img.jpg':'专辑《刘艳芬》从2022年初开始就有了雏形,当时易烊千玺对该张个人专辑定下了三个方向，即尝试不一样的曲风，延续上一张专辑《后座剧场》中的声音剧情，以及避免过于私人化的表达。他希望这张专辑能触达更多情绪，无论这种情绪是来自接触过的角色或电影，还是在生活中感受、观察所得，而专辑名“刘艳芬”则成为了虚拟的观察者代号。“刘艳芬”源自易烊千玺参加综艺《放开我北鼻》时，以女装扮演节目工作人员后随口给自己取的名字。'
}

function showText(image){
    textshow.textContent=textContents[image];
}
function changeBackground(image){
    allhtml.style.backgroundImage='url(images/'+image+')';
}

for(const image of images){
    const newImage=document.createElement('img');
    newImage.setAttribute('src','images/'+image);
    newImage.setAttribute('alt',alts[image]);
    imgbar.appendChild(newImage);
    newImage.addEventListener('click',function(e){
        displayimage.src=e.target.src,
        displayimage.alt=e.target.alt,
        showText(image);
        changeBackground(image);
    });
}

btn.addEventListener('click',function(){
    const btnclass=btn.getAttribute('class');
    if(btnclass==='dark'){
        btn.setAttribute('class','light');
        btn.textContent='Lighten';
        overlay.style.backgroundColor='rgba(0,0,0,0.5)';
    }else{
        btn.setAttribute('class','dark');
        btn.textContent='Darken';
        overlay.style.backgroundColor='rgba(0,0,0,0)';
    }

});

function prevImage(){
    const currentImage=displayimage.getAttribute('src');
    const currentIndex=images.indexOf(currentImage.substring(7));
    const prevIndex=(currentIndex-1+images.length)%images.length;
    const prevImage=images[prevIndex];
    displayimage.src='images/'+prevImage;
    displayimage.alt=alts[prevImage];
    showText(prevImage);
    if(currentIndex===0){
        alert('这是第一张图片！');
    }
}

function nextImage(){
    const currentImage=displayimage.getAttribute('src');
    const currentIndex=images.indexOf(currentImage.substring(7));
    const nextIndex=(currentIndex+1)%images.length;
    const nextImage=images[nextIndex];
    displayimage.src='images/'+nextImage;
    displayimage.alt=alts[nextImage];
    showText(nextImage);
    if(currentIndex===images.length-1){
        alert('这是最后一张图片！');
    }
}