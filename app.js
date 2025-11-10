// =========================================================
// ARQUIVO: app.js
// FUNÇÃO: Gerenciamento de Roteamento (SPA) e Validação de Formulário
// =========================================================

// --- 1. FUNÇÃO DE VALIDAÇÃO DE DADOS (CRITÉRIO OBRIGATÓRIO) ---

/**
 * Valida os dados do formulário de doação.
 * @param {Event} event - O evento de submissão do formulário.
 */
function validateDonationForm(event) {
    event.preventDefault();

    const form = event.target;
    const amount = form.querySelector('#amount').value;
    const name = form.querySelector('#donor-name').value.trim();
    const email = form.querySelector('#donor-email').value.trim();
    const alertArea = form.querySelector('#donation-alert-area');
    
    // Expressão regular básica para validar e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    // Limpa alertas anteriores
    alertArea.innerHTML = '';

    let errors = [];

    // Verificação 1: Nome
    if (name.length < 3) {
        errors.push("O nome deve ter pelo menos 3 caracteres.");
    }

    // Verificação 2: E-mail
    if (!emailRegex.test(email)) {
        errors.push("Por favor, insira um endereço de e-mail válido.");
    }
    
    // Verificação 3: Valor da Doação
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
        errors.push("O valor da doação deve ser um número positivo.");
    }

    if (errors.length > 0) {
        // Exibe o alerta de erro
        const errorHtml = `
            <div class="alert alert-error">
                <strong>Erro de preenchimento!</strong>
                <ul>${errors.map(err => `<li>${err}</li>`).join('')}</ul>
            </div>
        `;
        alertArea.innerHTML = errorHtml;
    } else {
        // Exibe alerta de sucesso
        const successHtml = `
            <div class="alert alert-success">
                <strong>Sucesso!</strong> Formulário enviado. Redirecionando para o pagamento...
            </div>
        `;
        alertArea.innerHTML = successHtml;
        
        // Simulação de envio de dados e limpeza do formulário
        form.reset();
        console.log(`Doação de R$${parsedAmount.toFixed(2)} recebida de ${name}.`);
    }
}


// --- 2. TEMPLATES JAVASCRIPT ---

const Templates = {
    // Template para a rota '/doacao' (NOVA PÁGINA COM VALIDAÇÃO)
    doacao: `
        <section id="doacao-form">
            <h2>Faça Sua Doação e Transforme Vidas</h2>
            
            <div id="donation-alert-area">
                </div>

            <form id="donation-form-spa" action="#">
                <fieldset>
                    <legend>Dados do Doador</legend>
                    <div class="form-group">
                        <label for="donor-name">Seu Nome Completo</label>
                        <input type="text" id="donor-name" required placeholder="Ex: Maria Silva">
                    </div>
                    <div class="form-group">
                        <label for="donor-email">Seu Melhor E-mail</label>
                        <input type="email" id="donor-email" required placeholder="exemplo@email.com">
                    </div>
                </fieldset>
                
                <fieldset>
                    <legend>Valor da Doação</legend>
                    <div class="form-group">
                        <label for="amount">Valor em R$</label>
                        <input type="number" id="amount" step="0.01" min="1" required placeholder="Mínimo R$1,00">
                    </div>
                </fieldset>
                
                <button type="submit" class="btn btn-secondary">Confirmar Doação</button>
            </form>
        </section>
    `,

    // Templates Existentes (Simplificados para Brevidade)
    // (Observe as tags <figure> com o <img> dentro)
    home: `
        <section id="institucional">
            <h2>Nossa Missão</h2>
            <p>A Iniciativa Cidadã trabalha incansavelmente para promover a reintegração plena de pessoas...</p>
            <figure>
                <img src="imagens/aperto-de-maos.jpg" alt="Aperto de mãos" width="600" height="400">
                <figcaption>Compromisso com a Dignidade Humana.</figcaption>
            </figure>
            <section id="mvv" class="flex-group justify-between align-start">
                <article><h4>Missão</h4><p>Mudar o paradigma da exclusão...</p></article>
                <article><h4>Visão</h4><p>Ser a organização referência...</p></article>
                <article><h4>Valores</h4><ul><li>Dignidade</li><li>Transparência</li></ul></article>
            </section>
        </section>
        
        <section id="equipe">
            <h2>Equipe e Estrutura</h2>
            <div class="equipe-membros flex-group">
                <figure><img src="imagens/equipe-unida.jpg" alt="Nossa equipe" width="250" height="250"></figure>
            </div>
            <p>Conheça os profissionais e voluntários dedicados à nossa causa.</p>
        </section>
    `,
  
// ...
      projetos: `
        <section id="projetos-detalhados">
            <h2>Nossas 5 Ações Fundamentais</h2>
            
            <div class="grid-12-col">
                <article class="card col-span-4">
                    <div class="card-image">
                        <img src="imagens/chave-casa.jpg" alt="Entrega de chave">
                    </div>
                    <div class="card-body">
                        <h3>1. Habitação Primeiro</h3>
                        <p>Provedor de moradia digna imediatamente...</p>
                        <div class="badge badge-secondary">Foco Principal</div>
                        <a href="#" class="btn btn-secondary">Saiba Mais</a>
                    </div>
                </article>

                <article class="card col-span-4">
                    <div class="card-image">
                        <img src="imagens/oficina-trabalho.jpg" alt="Oficina">
                    </div>
                    <div class="card-body">
                        <h3>2. Qualificação Profissional</h3>
                        <p>Cursos, oficinas e encaminhamento para o mercado de trabalho...</p>
                        <div class="badge badge-primary">Em Andamento</div>
                        <a href="#" class="btn btn-primary">Participe</a>
                    </div>
                </article>
                
                </div>
        </section>

        `,
    // ...
    // No seu app.js, verifique o Templates.cadastro:
    // ...
    cadastro: `
        <section id="formulario-voluntario">
            <h2>Cadastro de Voluntário</h2>
            <figure>
                <img src="imagens/horizonte-esperanca.jpg" alt="Esperança" width="600" height="250">
            </figure>
            </section>
    `,
    // ...
    contato: `<section><h2>Fale Conosco</h2><p>Informações de contato...</p></section>`,
    notFound: `<section style="text-align: center;"><h2>404</h2><p>Página não encontrada.</p></section>`
}

// --- 3. MAPA DE ROTAS ---

const Routes = {
    '/': Templates.home,
    '/projetos': Templates.projetos,
    '/cadastro': Templates.cadastro,
    '/doacao': Templates.doacao, // NOVA ROTA
    '/contato': Templates.contato
};


// --- 4. LÓGICA DO ROTEADOR E INICIALIZAÇÃO ---

const appRoot = document.getElementById('app-root');

/**
 * Renderiza o template correspondente à rota atual e anexa listeners específicos.
 */
function navigate(pathname) {
    const template = Routes[pathname] || Templates.notFound;
    
    // 1. Atualiza o DOM
    appRoot.innerHTML = template;
    
    // 2. Anexa Listeners de Evento Específicos após a renderização
    if (pathname === '/doacao') {
        const donationForm = document.getElementById('donation-form-spa');
        if (donationForm) {
            // Anexa a função de validação ao evento 'submit' do formulário
            donationForm.addEventListener('submit', validateDonationForm);
        }
    }
    
    window.scrollTo(0, 0);
}

/**
 * Manipula o clique em links e usa a History API.
 */
function handleLinkClick(event) {
    const link = event.target.closest('[data-route]');
    if (link) {
        event.preventDefault();
        const pathname = link.getAttribute('data-route');
        
        window.history.pushState({}, pathname, window.location.origin + pathname);
        navigate(pathname);
    }
}

// 5. EVENT LISTENERS GERAIS
document.addEventListener('click', handleLinkClick);
window.addEventListener('popstate', () => navigate(window.location.pathname));
window.addEventListener('load', () => navigate(window.location.pathname));

// Lógica básica do menu hambúrguer (se estiver no seu HTML)
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.getElementById('main-nav');
if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('nav-open');
    });
}