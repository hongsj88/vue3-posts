name:  Bug Report
description: 발견한 버그를 제보해주세요
title: "[Bug] "
labels: [bug]
assignees: ''

body:
  - type: markdown
    attributes:
      value: |
        버그를 발견하셨군요! 최대한 자세히 적어주시면 빠르게 해결할 수 있어요 

  - type: input
    id: what-happened
    attributes:
      label: 어떤 문제가 발생했나요?
      placeholder: ex) 로그인 시 500 에러 발생
    validations:
      required: true

  - type: textarea
    id: steps
    attributes:
      label: 어떻게 재현되나요?
      placeholder: |
        1. 로그인 페이지로 이동
        2. 이메일, 비밀번호 입력
        3. 로그인 버튼 클릭
        4. 에러 발생
    validations:
      required: true

  - type: textarea
    id: expected
    attributes:
      label: 기대했던 결과는?
      placeholder: ex) 정상적으로 대시보드로 이동해야 합니다

  - type: textarea
    id: screenshot
    attributes:
      label: 스크린샷 (있다면)
      placeholder: 이미지나 에러 메시지를 첨부해주세요
