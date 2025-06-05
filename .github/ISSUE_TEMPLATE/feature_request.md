name: ✨ Feature Request
description: 새 기능이나 개선 아이디어를 제안해주세요
title: "[Feature] "
labels: [enhancement]
assignees: ''

body:
  - type: input
    id: feature-title
    attributes:
      label: 어떤 기능인가요?
      placeholder: 예: 게시글 북마크 기능
    validations:
      required: true

  - type: textarea
    id: description
    attributes:
      label: 어떤 문제를 해결하고 싶으신가요?
      placeholder: 사용자가 게시글을 저장하고 나중에 다시 보고 싶을 때 필요함

  - type: textarea
    id: additional
    attributes:
      label: 기타 참고 사항
      placeholder: 참고할 만한 링크, 유사 사례 등
