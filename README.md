# Developers

---

고려대학교 불어불문학과 21학번 정민승

한양대학교 생명과학과 20학번 강다희

# 사용된 기술

---

- **프론트엔드:** React
- **백엔드:** Flask, Python
- **Cloud:** Kcloud
- **DB:** MySQL

# 프로젝트 소개

---
AI를 통해 작곡, 취향 분석을 할 수 있는 전문가를 위한 음원 스트리밍 서비스입니다. 

# 기능 소개

---

### 1. 회원가입/로그인

이메일, 아이디, 비밀번호, 닉네임 정보를 입력하여 회원가입 할 수 있습니다. 가입된 정보로 로그인 할 수 있습니다. 
<img width="1438" alt="%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202024-01-17%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%209 51 39" src="https://github.com/mingeung/madcamp_week3_frontend/assets/119600579/b59e8f34-bb0e-4f41-b8ba-4d375f057ade">


<img width="1436" alt="%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202024-01-17%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%209 49 19" src="https://github.com/mingeung/madcamp_week3_frontend/assets/119600579/8f1bd654-0878-47f8-938c-e9ca7cf0043e">



### 2. 프로필

가입된 회원정보를 프로필에서 확인할 수 있습니다. 프로필에 사진을 등록하려면 사진 칸을 클릭해서 사진을 올릴 수 있습니다. <img width="1438" alt="%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202024-01-17%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%209 41 24" src="https://github.com/mingeung/madcamp_week3_frontend/assets/119600579/f2275a85-80a2-4d37-956f-ab3a99ca076d">


### 3. 음원 스트리밍

듣고싶은 가수 이름, 노래 제목, 장르 등을 검색해서 spotify api를 통해 불러온 음악들을 들을 수 있습니다. 
<img width="1439" alt="%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202024-01-17%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%209 41 08" src="https://github.com/mingeung/madcamp_week3_frontend/assets/119600579/5c1af245-7882-442e-b464-0cd331b20628">

### 4. 보관함

사용자가 자주 듣고싶거나, 좋아하는 음악은 하트를 눌러 보관함에 보관할 수 있습니다. 보관함에 보관된 노래는 하트를 다시 누르면 삭제할수도 있습니다.
<img width="721" alt="%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202024-01-17%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%209 41 35" src="https://github.com/mingeung/madcamp_week3_frontend/assets/119600579/91b6b5b6-f636-41f8-bf07-76ca4a87adcd">


### 5. 커뮤니티

Rock, Kpop, Jpop, Ballade, Dance 중 사용자가 관심있는 장르의 커뮤니티를 선택해서 같은 장르를 좋아하는 다른 사용자들과 의견을 나눌 수 있습니다.
<img width="1438" alt="%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202024-01-17%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%209 41 52" src="https://github.com/mingeung/madcamp_week3_frontend/assets/119600579/6a9dec6c-7d54-432c-b034-1b03b3397520">
<img width="1435" alt="%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202024-01-17%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%209 42 09" src="https://github.com/mingeung/madcamp_week3_frontend/assets/119600579/215789fb-b34c-4e94-9807-aa368ba605b5">


### 6. AI 노래 취향 분석

사용자가 보관함에 보관한 노래 데이터를 AI가 분석합니다. 사용자의 노래 취향을 해시태그 3개로 나타내어 알려주고 , 사용
<img width="1438" alt="%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202024-01-17%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%209 42 18" src="https://github.com/mingeung/madcamp_week3_frontend/assets/119600579/37e8e15b-d7e4-499b-9a20-b4f3580da5fc">
<img width="1438" alt="%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202024-01-17%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%209 42 37" src="https://github.com/mingeung/madcamp_week3_frontend/assets/119600579/5c623ea0-232e-4187-8d6f-e9b5dd71c660">



### 7. AI 작곡하기

내가 원하는 느낌의 노래를 직접 만들 수 있습니다. 작곡하고 싶은 장르를 선택하고, 좋아하는 노래의 가수 이름과 제목을 입력하면 AI가 사용자 취향의 곡을 작곡해줍니다.

AI가 사용자가 원하는 느낌으로 직접 만든 앨범커버와 가사, 코드를 확인할 수 있습니다. chord 버튼을 클릭해서 작곡된 코드의 음악을 직접 들어볼 수 있습니다. 
<img width="1440" alt="%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202024-01-17%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%209 43 35" src="https://github.com/mingeung/madcamp_week3_frontend/assets/119600579/2c662790-0d35-4544-8fbf-124a0cb6ee4b">


   

### 8. AI 음원 이용 현황 분석

1. 월간통계/주간통계
    
    월간, 주간 음원 이용 현황을 알 수 있습니다.
    
    AI가 사용자가 들은 노래 데이터를 분석하여 월간 및 주간 음원 장르 비율을 파이차트로 알기 쉽게 보여줍니다.

<img width="1439" alt="%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202024-01-17%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%209 43 44" src="https://github.com/mingeung/madcamp_week3_frontend/assets/119600579/41d2f0ed-127d-42ab-b55f-a6754b7f8027">

     
    
2. 월간로그
    
    월간 음원 이용 현황을 AI가 분석하여 사용자가 선호하는 아티스트, 가장 많이 들은 장르, 가장 많이 들은 노래를 한 눈에 보여줍니다.
<img width="1439" alt="%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202024-01-17%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%209 43 53" src="https://github.com/mingeung/madcamp_week3_frontend/assets/119600579/568b3dea-4c13-40d8-b7e9-7990a21ec3c7">


### 보완할 점
1. css 비율 보완
2. chatgpt 작곡 페이지 오류 보완
3. chat gpt api 여러번 호출되는 문제
4. 사이트 배포
5. 실시간 채팅 기능
6. spotify 로그인을 통해 음악 전체 재생 가능하게 하기


