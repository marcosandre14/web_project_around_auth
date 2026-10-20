<div align="center">

# 🌍 EUA Afora (Around The U.S.)

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-BEM-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

<p align="center">
  <b>Uma plataforma social e interativa para exploração de locais turísticos nos EUA com autenticação completa e gestão em tempo real.</b>
</p>

---

</div>

## 📌 Sobre o Projeto

O **EUA Afora** é uma aplicação web completa desenvolvida em **React**, focada em proporcionar uma experiência fluida para os usuários compartilharem e explorarem imagens de locais incríveis nos Estados Unidos.

Na sua **17ª etapa**, a plataforma foi elevada a um padrão de nível de produção com a integração de um sistema robusto de **Autenticação, Autorização e Persistência de Usuários** com **JWT (JSON Web Tokens)**, garantindo navegação segura por meio de rotas protegidas e modais de feedback dinâmicos.

---

## ✨ Destaques & Funcionalidades

| Recurso                   | Descrição                                                                                                           |
| :------------------------ | :------------------------------------------------------------------------------------------------------------------ |
| 🔑 **Cadastro & Login**   | Registro de novos usuários (`/signup`) e autenticação segura (`/signin`) integrados à API REST.                     |
| 🛡️ **Rotas Protegidas**   | Proteção da rota principal (`/`) através do componente `ProtectedRoute`, impedindo acessos não autorizados.         |
| 🔄 **Sessão Persistente** | Validação automática do token no `localStorage` ao recarregar a página (`/users/me`), mantendo o usuário conectado. |
| 📱 **Header Responsivo**  | Cabeçalho dinâmico adaptável com menu hambúrguer para dispositivos móveis e alternância de rotas.                   |
| 💬 **Modais de Feedback** | Componente `InfoTooltip` para confirmação visual e amigável de sucesso ou erros nas requisições.                    |
| 🖼️ **Gestão do Feed**     | Criação, curtida, exclusão de cartões e edição do perfil/avatar do usuário com contexto global.                     |

---

## 🛠️ Tecnologias e Metodologias

- **Front-end:** React 18, React Router DOM v6, JSX
- **Build Tool:** Vite
- **Estilização:** CSS3 puro baseado na metodologia **BEM** (Block Element Modifier), Flexbox e CSS Grid
- **Arquitetura & Estado:** Hooks nativos (`useState`, `useEffect`, `useNavigate`, `useLocation`), Context API (`CurrentUserContext`)
- **Comunicação:** API REST assíncrona utilizando `fetch` e cabeçalhos de autorização `Bearer`

---

## 📱 Design Responsivo

A interface foi projetada rigorosamente alinhada ao protótipo do **Figma**, aplicando o conceito _mobile-first_ com adaptações completas para múltiplos tamanhos de tela (de **320px** a telas ultrawide).

---
