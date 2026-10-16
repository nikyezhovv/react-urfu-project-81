# Генератор форм на TypeScript

[![hexlet-check](https://github.com/nikyezhovv/react-urfu-project-81/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/nikyezhovv/react-urfu-project-81/actions)
[![CI](https://github.com/nikyezhovv/react-urfu-project-81/actions/workflows/ci.yml/badge.svg)](https://github.com/nikyezhovv/react-urfu-project-81/actions/workflows/ci.yml)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=nikyezhovv_react-urfu-project-81&metric=coverage)](https://sonarcloud.io/summary/new_code?id=nikyezhovv_react-urfu-project-81)

Библиотека, с помощью которой удобно создавать формы в шаблонах сайтов. Она заметно сокращает код описания формы за счет автоматической обработки ошибок и различных контролов.

Учебный проект Хекслета: https://ru.hexlet.io/

## Стек

- TypeScript
- Vitest
- GitHub Actions, SonarQube Cloud

## Установка

```bash
git clone https://github.com/nikyezhovv/react-urfu-project-81.git
cd react-urfu-project-81
npm install
npm run build
```

## Использование

```ts
import HexletCode from "@hexlet/code";

const template = { name: "rob", job: "hexlet" };

const form = HexletCode.formFor(template, { url: "/users" }, (f) => {
  f.input("name", { class: "user-input" });
  f.input("job", { as: "textarea", rows: 50, cols: 50 });
  f.submit("Wow");
});
```

Результат:

```html
<form method="post" action="/users">
  <label for="name">Name</label>
  <input name="name" type="text" value="rob" class="user-input">
  <label for="job">Job</label>
  <textarea cols="50" rows="50" name="job">hexlet</textarea>
  <input type="submit" value="Wow">
</form>
```

Если поля нет в объекте, будет ошибка: `Field 'age' does not exist in the template.`

---

<details>
<summary>Автоматические тесты Хекслета</summary>

Тесты запускаются на каждый коммит. За запуск отвечает файл `.github/workflows/hexlet-check.yml` — не удаляйте и не переименовывайте ни его, ни репозиторий.

</details>

## О Хекслете

[Хекслет](https://ru.hexlet.io/) — школа программирования: авторские программы обучения с практикой, поддержкой наставников и реальными проектами, которые остаются в резюме. Этот репозиторий — один из таких проектов.