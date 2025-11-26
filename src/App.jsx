import { useState, useEffect } from 'react'
import './App.css'
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./config/firebase";
import 리셋 from "./랜딩페이지아이콘/1page/리셋버튼아이콘.png"
import 로고 from "./랜딩페이지아이콘/1page/나란로고.png"
import 말풍선1 from"./랜딩페이지아이콘/1page/기각률1미만.png"
import 말풍선2 from"./랜딩페이지아이콘/1page/12개월분납가능.png"
import 화살표 from "./랜딩페이지아이콘/1page/화살표버튼.png"
import 변제율 from"./랜딩페이지아이콘/1page/1.png"
import 즉시 from"./랜딩페이지아이콘/1page/2.png"
import 사후보정 from"./랜딩페이지아이콘/1page/3.png"
import 무료상담  from"./랜딩페이지아이콘/1page/무료상담.png"
import 버튼  from"./랜딩페이지아이콘/1page/버튼.png"
import 손  from"./랜딩페이지아이콘/1page/손.png"
/*----------------------------1페이지 끝!!!!!!!!!!---------------------------*/
import 조정전 from"./랜딩페이지아이콘/2page/조정전.png"
import 조정후 from"./랜딩페이지아이콘/2page/조정후.png"
import 투명  from"./랜딩페이지아이콘/2page/투명한비용공개.png"
import 배너 from"./랜딩페이지아이콘/2page/분납가능배너.png"
import 원금 from"./랜딩페이지아이콘/2page/매달상환하는원금.png"
/*-------------------------2페이지 끝----------------------------------------*/
import 밑화살표 from"./랜딩페이지아이콘/3page/아래화살표.png"
import 그림자 from"./랜딩페이지아이콘/3page/그림자.png"
import 자물쇠 from"./랜딩페이지아이콘/3page/자물쇠.jpeg"

function App() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    debt: "",
    monthly: "",
    content: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.agree) {
      alert("개인정보 수집/이용에 동의해야 합니다.");
      return;
    }

    await addDoc(collection(db, "consultRequests"), {
      ...form,
      createdAt: serverTimestamp(),
    });

    alert("상담 신청이 완료되었습니다.");
    setForm({
      name: "",
      phone: "",
      debt: "",
      monthly: "",
      content: "",
      agree: false,
    });
  };
  const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};
   useEffect(() => {
  
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("show");
            }
            else {
              // 👇 화면에서 사라지면 show 제거 → 다시 실행 가능
              entry.target.classList.remove("show");
            }
          });
        },
        { threshold: 0.2 }
      );
          const hiddenElements = document.querySelectorAll(".hidden");
      hiddenElements.forEach((el) => observer.observe(el));
  
      return () => observer.disconnect();
    }, []);

  return (
    <>
   <div className="배경화면">
    <div><img src={로고} height="30%" width="30%"></img></div>
<div className="말풍선묶음">
  <img src={말풍선1}  className='말1 hidden fade-left'></img>
  <img src={말풍선2}  className='말2 hidden fade-right'></img>
  </div>
   <div className="초록네모 hidden fade-up glow-box"
   onClick={()=>scrollToSection("상담창")}>

  {/* 왼쪽 이미지 */}
  <div className="왼쪽">
    <img src={리셋} height="150" />
  </div>

  {/* 오른쪽 전체 */}
  <div className="오른쪽전체">

    <div className="제목영역">
      <p className="점">● ● ● ●</p>
      <p className="title"><span className="제로">ZERO</span> 리셋</p>
      <p className="sub">개인회생</p>
    </div>

    <p className="smallText">단 한번의 클릭으로 새 출발!</p>
  </div>

  {/* 화살표 이미지 — 오른쪽 끝 고정 */}
  <div className="화살표영역 pulse">
    <img src={화살표} className="arrow" width="30%" height="30%" />
  </div>
</div>
<div className='흰색박스 hidden fade-up'>
  <p className='개인'>개인회생 전문 로펌</p>
  <p className='만나'>나란을 만나보세요!</p>
  <div className='세이미지'>
<img src={변제율} width="20%" height="20%" className="세박스"
></img>
<img src={즉시} width="20%" height="20%" className="세박스"
></img>
<img src={사후보정} width="20%" height="20%" className="세박스"
></img>
</div>
</div>
<div className='까만박스'>
  <p className="점2">● ●●</p>
<p className='오직'>오직 이 링크에서만</p>
  <img src={무료상담} className='무료상담 fade-opacity'></img>
  <img src={손} className='손'></img>
<img src={버튼} className='버튼'></img>
</div>
{/*--------------------------------*1페이지끝!--------------------*/}
   <div className='큰흰색박스'>
    <p className='어떻게1'>채무 1억원, 금리 12%일 때</p>
    <p className='어떻게2'><span className='제로리셋 fade' >제로리셋 채무조정</span>을 받으면 어떻게 될까요?</p>
<div className='조정전후'>
  <img src={조정전}></img>
  <img src={조정후} className='fade-opacity'></img>
</div>
<div className='hidden fade-up' >
  <p className='감소1'>월 상환금 <span className="제로리셋">216만원 감소</span></p>
  <p className='감소2'>총 변제금 <span className="제로리셋">1억 6천 200만원 감소</span></p>
  <p className='경고'>*제로리셋 개인회생 비율은 개인의 조건에 따라 달라질 수 있습니다.</p>
</div>
<div>
  <img src={투명} className='hidden fade-up'></img>
</div>
<div className='배너'>
  <img src={배너}></img>
</div>
   </div>
   <div className='원금박스'>
   <img src={원금}></img>
   </div>
   <p className='회생1'>제로리셋 회생 신청 한 번으로</p>
   <p className='회생2'>모든 게 해결 됩니다!</p>
  {/*-------------------------2페이지 끝---------------*/}

<div className='밑화살표'>
    <img src={밑화살표}></img>
   </div>
  <div className='네모그룹'>
    <div className='카드1 hidden fade-up'>
      <p className='카드제목'>금융사 독촉 </p>
      <p className='카드제목'>즉시 중지</p> 
      <p className='카드내용'>법원을 통해 채권금지 명령을 받아 전화, 문자, 우편 등 어떠한 연락도 오지 않습니다.</p>
    </div>
    <div className='카드2 hidden fade-up'>
      <p className='카드제목' >대출금, 카드연체,</p>
      <p className='카드제목'> 독촉 즉시 중지</p>
      <p className='카드내용'>법원을 통해 중지명령을 받아 납부 의무가 중단됩니다.</p>
    </div>
    <div className='카드3 hidden fade-up'>
      <p className='카드제목'>빚이 얼마나</p> 
      <p className='카드제목'>줄어드나요?</p> 
      <p className='카드내용'>카드, 은행, 캐피탈, 사채 등 모든 빚을 통합하여 최대 95%까지 줄일 수 있습니다.</p>
    </div>
    <div className='카드4 hidden fade-up'>
      <p className='카드제목'>제로리셋</p> 
     <p className='카드제목'> 회생 신청 요건 </p>
      <p className='카드내용'>재산보다 채무가 많은 경우라면 가능합니다.</p>
    </div>
  </div>
  <p className='구구'>법무법인 나란 제로리셋 개인회생 인가율은 <span className='구구스팬'>99.9%</span>입니다.</p>
<img src={그림자}></img>
    </div>
  <div className="상담창">
 <p className="상담제목">지금 바로 상담 받아보세요!</p>
    <p className="상담서론1">법무법인 나란은 다양한 성공사례로</p>
    <p className="상담서론2">고객님에게 알맞는 맞춤 컨설팅을 제공해 드립니다.</p>
  <div className="상담폼박스 hidden fade-up">
          <form className="상담폼" onSubmit={handleSubmit}>

            <div className="입력그리드">

              <label>
                이름
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="이름을 입력해 주세요"
                  required
                />
              </label>

              <label>
                연락처
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  type="text"
                  placeholder="'-' 없이 입력해 주세요"
                  required
                />
              </label>

              <label>
                총 채무
                <input
                  name="debt"
                  value={form.debt}
                  onChange={handleChange}
                  type="text"
                  placeholder="총 채무를 입력해 주세요"
                  required
                />
              </label>

              <label>
                월 상환액
                <input
                  name="monthly"
                  value={form.monthly}
                  onChange={handleChange}
                  type="text"
                  placeholder="월 상환액을 입력해 주세요"
                />
              </label>
            </div>

            <label className="textarea영역">
              상담 내용
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="문의 내용을 입력해 주세요"
              />
            </label>

            <label className="체크라인">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
              />
              개인정보 수집 및 이용에 동의합니다.
            </label>

            <p className="보안문구">
              <img src={자물쇠} className="자물쇠" />
              개인정보는 암호화되어 안전하게 처리됩니다.
            </p>

            <button type="submit" className="상담버튼">상담신청</button>
          </form>
        </div>
</div>

   
  
    </>
  )
}

export default App
