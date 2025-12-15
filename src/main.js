import './style.css'

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScA3nXuEfjmBLrsDTrML7987ecCgQh8I2dp1aOaGbw-6VXVQg/formResponse';
const ENTRY_IDS = {
  studentId: 'entry.1624581547',
  name: 'entry.231349334',
  answer: 'entry.597446365'
};

// 지리 질문 리스트
const GEOGRAPHY_QUESTIONS = [
  '적도 부근에 위치한 지역임에도 불구하고 연중 온화한 기후가 나타나는 고산 도시(예: 보고타, 키토)의 기후 특징을 설명하고, 위도 요인만으로 기후를 설명할 수 없는 이유를 해발 고도의 영향과 연결하여 서술하시오.',
  '열대 우림 기후 지역에서 나타나는 스콜은 하루 중 특정 시간대에 집중되는 경향을 보인다. 이러한 시간적 특징이 나타나는 이유를 설명하시오.(단, 단순한 강수량 설명에 그치지 말 것)',
  '사바나 기후 지역에서 건기와 우기가 뚜렷하게 나타나는 원인을 적도 수렴대와 아열대 고압대의 계절적 이동과 연관 지어 설명하시오.',
  '건조 기후 지역에서 바드기르와 같은 전통적 건축 방식이 발달한 이유를 강수량, 일교차, 바람의 특성과 연결 지어 설명하시오.',
  '같은 위도에 위치한 대륙 서안과 대륙 동안 지역의 기온 연교차가 다르게 나타나는 이유를 수륙 분포와 해류의 영향을 중심으로 설명하시오.',
  '같은 위도에 위치한 지역임에도 불구하고 대륙 서안과 동안의 기후 특성은 서로 다르게 나타난다. 이 차이가 발생하는 이유를 설명하시오.',
  '카르스트 지형에서 석회 동굴이 형성되는 과정을 설명하시오.(단, 용식의 개념을 반드시 포함할 것)',
  '화산 주변에는 인간이 거주하지 않는다.라는 주장에 대해 반박하시오. (단, 화산회토와 에너지 이용(지열) 내용을 포함할 것)',
  '고기 습곡 산지와 신기 습곡 산지의 지형적 특징(고도, 경사 등)이 서로 다른 이유를 조산 운동 시기와 연결해 설명하시오.',
  '같은 종교를 믿는 지역이라도 음식 문화가 서로 다르게 나타나는 경우가 있다. 이러한 차이가 발생하는 이유를 자연 환경과 연결하여 사례를 들어 설명하시오.',
  '전통 축제가 관광 자원으로 활용될 때 지역 사회에 긍정적인 영향 뿐 아니라 부정적 영향도 발생하는 이유를 설명하시오.'
];

// 랜덤 질문 선택 함수
function getRandomQuestion() {
  const randomIndex = Math.floor(Math.random() * GEOGRAPHY_QUESTIONS.length);
  return GEOGRAPHY_QUESTIONS[randomIndex];
}

document.querySelector('#app').innerHTML = `
  <div class="container">
    <div class="header">
      <h1>랜덤 질문을 활용한 지리 탐구 활동</h1>
      <div class="nature-decoration">
        <div class="mountain-range">
          <div class="mountain mountain-1"></div>
          <div class="mountain mountain-2"></div>
          <div class="mountain mountain-3"></div>
          <div class="mountain mountain-4"></div>
          <div class="cloud cloud-1"></div>
          <div class="cloud cloud-2"></div>
        </div>
      </div>
    </div>
    
    <div class="form-wrapper">
      <div class="question-section">
        <h2 class="question-title">질문</h2>
        <div class="question-content">
          <p class="question-text" id="questionText">${getRandomQuestion()}</p>
        </div>
      </div>
      
      <form id="geographyForm" class="geography-form">
        <div class="form-group">
          <label for="studentId">학번(예:20318)</label>
          <input 
            type="text" 
            id="studentId" 
            name="studentId" 
            placeholder="예: 20318"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="name">이름</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="이름을 입력하세요"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="answer">답안</label>
          <textarea 
            id="answer" 
            name="answer" 
            rows="5"
            placeholder="답안을 입력하세요"
            required
          ></textarea>
        </div>
        
        <button type="submit" class="submit-btn">
          <span class="btn-text">제출하기</span>
          <span class="btn-icon">🌍</span>
        </button>
      </form>
      
      <div id="message" class="message"></div>
    </div>
  </div>
`;

const form = document.getElementById('geographyForm');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(form);
  const studentId = formData.get('studentId');
  const name = formData.get('name');
  const answer = formData.get('answer');
  
  // Google Form에 제출할 데이터 형식으로 변환
  const submitData = new URLSearchParams();
  submitData.append(ENTRY_IDS.studentId, studentId);
  submitData.append(ENTRY_IDS.name, name);
  submitData.append(ENTRY_IDS.answer, answer);
  
  try {
    // no-cors 모드로 제출
    const response = await fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: submitData.toString()
    });
    
    // no-cors 모드에서는 응답을 읽을 수 없지만, 제출은 성공한 것으로 간주
    showMessage('제출이 완료되었습니다! 🌍', 'success');
    form.reset();
    
    // 3초 후 메시지 제거
    setTimeout(() => {
      messageDiv.textContent = '';
      messageDiv.className = 'message';
    }, 3000);
    
  } catch (error) {
    showMessage('제출 중 오류가 발생했습니다. 다시 시도해주세요.', 'error');
    console.error('Error submitting form:', error);
  }
});

function showMessage(text, type) {
  messageDiv.textContent = text;
  messageDiv.className = `message ${type}`;
}
