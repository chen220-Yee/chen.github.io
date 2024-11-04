// 模拟宝藏地图API
class TreasureMap {
    static getInitialClue() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("在古老的图书馆里找到了第一个线索...");
        }, 1000);
      });
    }
  
    static decodeAncientScript() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const puzzle=prompt("进行解码即可获得线索：2*10=")
          if (puzzle !== "20") {
            reject("解码失败！无法获得线索！");
          }
          resolve("解码成功!宝藏在一座古老的神庙中...");
        }, 1500);
      });
    }
  
    static searchTemple() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const random=Math.random();
          if(random===0){
            reject("糟糕！遇到了神庙守卫！");
          }
          resolve("找到了一个神秘的箱子...");
        }, 1500);
      });
    }
  
    static openTreasureBox() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("恭喜!你找到了传说中的宝藏!");
        }, 2000);
      });
    }

    static encounterPuzzle() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const answer = prompt("请输入箱子密码: ");
          if (answer === "123456") {
            resolve("恭喜你解开了宝箱的密码！");
          } else {
            reject("很遗憾，你的答案是错的。");
          }
        }, 2000);
      });
    }


    static getInfo(){
      return new Promise((resolve)=>{
        setTimeout(()=>{
          resolve("小天使从天而降提供解码线索为:箱子密码为6位数且为连续的数...");
        },2000);
      });
    }

      
  }

  function findTreasureWithPromises() {
    TreasureMap.getInitialClue()
      .then(clue => {
        console.log(clue);
        return TreasureMap.decodeAncientScript();
      }) 
      .then(location => {
        console.log(location);
        return TreasureMap.searchTemple();
      })
      .then(result=>{
        console.log(result);
        return TreasureMap.getInfo();
      })
      .then(info=>{
        console.log(info);
        return TreasureMap.encounterPuzzle();
      })
      .then(box => {
        console.log(box);
        return TreasureMap.openTreasureBox();
      })
      .then(treasure => {
        console.log(treasure);
      })
      .catch(error => {
        console.error("任务失败:", error);
      });
  }

  async function findTreasureWithAsyncAwait(){
    const output=document.getElementById("output");
    const person=document.getElementById("person");
    const show=document.getElementById("show");
    output.innerHTML="";

    // 重置页面状态
    output.innerHTML = ''; // 清空之前的输出
    person.style.transform = 'translateX(0)'; // 重置人物位置
    show.style.backgroundImage = 'url("p1.png")'; // 重置背景图片

    // 移除之前的箱子图片
    const existingBox = document.getElementById('box');
    if (existingBox) {
      existingBox.remove();
    }

    try {

      const clue=await TreasureMap.getInitialClue();
      output.innerHTML += `<p>${clue}</p>`;
      console.log(clue);
      person.style.transform='translateX(200px)';
      await new Promise((resolve)=>{setTimeout(resolve,1000)});
      
      const location=await TreasureMap.decodeAncientScript();
      output.innerHTML = `<p>${location}</p>`;
      console.log(location);

      const templeButton=document.createElement("button");
      templeButton.innerHTML="前往神庙";
      templeButton.onclick=async () =>{
        show.style.backgroundImage='url("temple.png")';
        console.log("前往神庙...");   
        await new Promise((resolve)=>{setTimeout(resolve,1000)});

        const result=await TreasureMap.searchTemple();
        output.innerHTML = `<p>${result}</p>`;
        console.log(result);

        //显示宝箱
        const treasureBox=document.createElement("img");
        treasureBox.src="box1.png";
        treasureBox.id="box";
        show.appendChild(treasureBox);
        await new Promise((resolve)=>{setTimeout(resolve,1000)});
        
        treasureBox.style.display="block";
        await new Promise((resolve)=>{setTimeout(resolve,1000)});

        person.style.transform='translateX(350px)';
        await new Promise((resolve)=>{setTimeout(resolve,1000)});
        
        const npc=document.createElement("img");
        npc.src="npc.png";
        npc.id="npc";
        show.appendChild(npc);
        npc.style.display="block";
        await new Promise((resolve)=>{setTimeout(resolve,1000)});

        npc.style.transform='translateY(240px)';
        await new Promise((resolve)=>{setTimeout(resolve,1000)});
        alert("小天使从天而降为寻宝的人类提供线索...");
        await new Promise((resolve)=>{setTimeout(resolve,1000)});

        const info=await TreasureMap.getInfo();
        output.innerHTML = `<p>${info}</p>`;
        console.log(info);

        npc.style.display="none";
        await new Promise((resolve)=>{setTimeout(resolve,1000)});

        const box=await TreasureMap.encounterPuzzle();
        output.innerHTML = `<p>${box}</p>`;
        console.log(box);

        treasureBox.src = 'box.png'; // 打开的宝箱图片路径
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        const treasure=await TreasureMap.openTreasureBox();
        output.innerHTML = `<p>${treasure}</p>`;
        console.log(treasure);
        // 弹出成功找到宝藏的信息
        alert('恭喜你！你成功找到了宝藏！');
      };
      output.appendChild(templeButton);
    } catch (error) {
      output.innerHTML += `<p>任务失败: ${error}</p>`;   
      console.error("任务失败:", error);
    }
  }

  document.getElementById("start").addEventListener("click",findTreasureWithAsyncAwait);