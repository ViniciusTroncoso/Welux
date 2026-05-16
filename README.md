# Welux

**Agência de webdesign premium para médicos.**
Sites que comunicam autoridade. Pacientes que chegam decididos.

- Domínio: `welux.com.br`
- Instagram: criado
- Email corporativo: criado
- Status: em estruturação (fase de setup)

---

## O que é isso aqui

Este repositório é o **hub central da Welux**. Aqui mora:

- Identidade da marca (cores, tipografia, voz)
- Documentação de processos (vendas, entrega, financeiro)
- Landing page principal (HTML estático, base para Webflow)
- Setup técnico (domínio, email, ferramentas)
- Onboarding pros sócios

Todo sócio deve dar `git pull` antes de mexer e abrir PR quando for mudar algo importante.

---

## Por onde começar (ordem recomendada)

1. **Leia o onboarding** → [`docs/ONBOARDING-SOCIOS.md`](docs/ONBOARDING-SOCIOS.md)
2. **Entenda o posicionamento** → [`docs/POSICIONAMENTO.md`](docs/POSICIONAMENTO.md)
3. **Veja o setup técnico** → [`docs/SETUP-HOSTINGER.md`](docs/SETUP-HOSTINGER.md)
4. **Stack e ferramentas** → [`docs/STACK.md`](docs/STACK.md)
5. **Identidade visual** → [`docs/BRAND.md`](docs/BRAND.md)
6. **Landing page (HTML pronto)** → [`landing-page/index.html`](landing-page/index.html)

---

## Estrutura

```
Welux/
├── README.md                       # este arquivo
├── docs/
│   ├── ONBOARDING-SOCIOS.md        # como cada sócio entra no projeto
│   ├── POSICIONAMENTO.md           # promessa, mecanismo, ICP
│   ├── SETUP-HOSTINGER.md          # passo a passo do domínio + email + DNS
│   ├── STACK.md                    # ferramentas que usamos
│   ├── BRAND.md                    # cores, tipografia, voz
│   ├── PROCESSO-VENDAS.md          # funil, qualificação, fechamento
│   └── TMBCO-INPUTS.md             # formulário Copynho preenchido (base da copy)
├── brand/                          # logos, fontes, mockups (binários ficam aqui)
└── landing-page/
    ├── index.html                  # landing principal (Arquitetura A - 11 seções)
    └── README.md                   # notas de implementação no Webflow
```

---

## Próximos passos (checklist de lançamento)

- [x] Criar email corporativo
- [x] Criar Instagram
- [x] Criar repositório no GitHub
- [ ] Configurar domínio na Hostinger (ver `docs/SETUP-HOSTINGER.md`)
- [ ] Apontar DNS para servidor de hospedagem
- [ ] Configurar registros MX (email profissional)
- [ ] Definir identidade visual final (logo, paleta)
- [ ] Construir landing page no Webflow a partir do HTML deste repo
- [ ] Publicar landing em `welux.com.br`
- [ ] Criar CNPJ (se ainda não tiver)
- [ ] Definir contrato padrão de prestação de serviço
- [ ] Definir processo comercial (qualificação → diagnóstico → proposta)
