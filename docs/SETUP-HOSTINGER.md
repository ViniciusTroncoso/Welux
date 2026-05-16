# Setup Hostinger — Domínio, Email e DNS para `welux.com.br`

Guia passo a passo pra deixar o domínio funcionando, com email profissional e pronto pra apontar pra landing page.

---

## Pré-requisitos

- Conta na Hostinger ativa
- Domínio `welux.com.br` **registrado** na Hostinger (ou pronto pra registrar)
- Cartão de crédito para o plano de email (se ainda não tiver)

---

## Parte 1 — Registro do domínio (se ainda não fez)

1. Entre em [hostinger.com.br](https://hostinger.com.br) → login
2. Menu → **Domínios** → **Comprar Domínio**
3. Buscar `welux.com.br`
4. Adicionar ao carrinho
5. Finalizar compra (1 ano mínimo — recomendo 2 anos pra evitar esquecimento de renovação)
6. Após confirmação, o domínio aparece em **Domínios > Meus Domínios**

> ⚠️ **`.com.br` exige CNPJ ou CPF brasileiro.** A Hostinger pede no checkout. Se for usar CPF do Vini agora e mudar pra CNPJ depois, é tranquilo (troca via Registro.br).

---

## Parte 2 — Configurar DNS (apontamento)

A landing page vai ficar **no Webflow** (não na Hostinger). Então o domínio precisa **apontar pro Webflow**.

### Passos:

1. Hostinger → **Domínios** → clica em `welux.com.br`
2. Aba **DNS / Nameservers**
3. **Mantém os nameservers da Hostinger** (não troca pra Webflow). Isso permite controlar tudo num lugar só.
4. Vai pra **Zona DNS**

### Registros que você precisa criar:

> **IMPORTANTE:** os valores específicos (IPs e domínio CNAME) **vêm do painel do Webflow** quando você adicionar `welux.com.br` no projeto Webflow. Os valores abaixo são os atuais (verificar no Webflow antes de criar):

| Tipo | Nome/Host | Aponta para | TTL |
|------|-----------|-------------|-----|
| `A` | `@` | `75.2.60.5` (Webflow) | 3600 |
| `A` | `@` | `99.83.190.102` (Webflow — IP secundário) | 3600 |
| `CNAME` | `www` | `proxy-ssl.webflow.com` | 3600 |

**Apagar registros antigos do tipo `A` que apontam pra IP padrão da Hostinger.**

### Validação:

- Salve as alterações
- Espera de **15min a 24h** pra propagar (geralmente 30min)
- Testar: `dig welux.com.br +short` ou usar [whatsmydns.net](https://www.whatsmydns.net)

---

## Parte 3 — Email profissional (`contato@welux.com.br`)

A Hostinger tem **email profissional incluso em planos de hospedagem**, mas como vamos hospedar no Webflow, precisamos do **plano de email separado**.

### Opção A — Hostinger Email Business (R$ 9-13/mês por caixa)

1. Hostinger → **Emails** → **Comprar plano de email**
2. Escolhe **Business Email** (10GB) ou **Enterprise** (75GB) — Business já é o suficiente
3. Associa ao domínio `welux.com.br`
4. Cria as caixas:
   - `contato@welux.com.br` (principal)
   - `vini@welux.com.br`
   - `socio2@welux.com.br` (etc)
5. Hostinger configura automaticamente os registros **MX, SPF, DKIM e DMARC** na zona DNS

### Opção B — Google Workspace (R$ 30/usuário/mês)

Recomendado se quiser entregabilidade premium (Gmail + Drive + Meet + Calendar).

1. [workspace.google.com](https://workspace.google.com) → contratar
2. Adicionar domínio `welux.com.br`
3. Google fornece os registros MX e TXT de verificação
4. **Adicionar manualmente na zona DNS da Hostinger:**

| Tipo | Nome | Valor | Prioridade |
|------|------|-------|------------|
| MX | `@` | `smtp.google.com` | 1 |
| TXT | `@` | `google-site-verification=<código>` | — |
| TXT | `@` | `v=spf1 include:_spf.google.com ~all` | — |

5. Validar no console do Google → pronto.

> **Recomendação:** começa com **Hostinger Email Business** (mais barato, suficiente). Migra pra Google Workspace quando a operação justificar.

---

## Parte 4 — SSL / HTTPS

- Se hospedar no Webflow → Webflow cuida do SSL automaticamente após o DNS propagar
- Se hospedar na Hostinger → ativar SSL grátis (Let's Encrypt) em **Hospedagem > SSL**

---

## Parte 5 — Checklist final

- [ ] Domínio `welux.com.br` registrado na Hostinger
- [ ] DNS apontando pro Webflow (A + CNAME corretos)
- [ ] Propagação confirmada (`dig welux.com.br` mostra IP do Webflow)
- [ ] Plano de email ativo
- [ ] Caixa `contato@welux.com.br` criada e testada (envio + recebimento)
- [ ] SPF, DKIM, DMARC configurados (Hostinger faz automático; verificar em [mxtoolbox.com](https://mxtoolbox.com))
- [ ] SSL ativo (cadeado verde em `https://welux.com.br`)
- [ ] Redirect `www.welux.com.br` → `welux.com.br` (ou vice-versa)

---

## Problemas comuns

| Sintoma | Causa | Solução |
|---------|-------|---------|
| Site não abre após 24h | DNS errado ou cache do navegador | `dig welux.com.br` + testar em aba anônima |
| Email não envia | SPF/DKIM não propagaram | Esperar até 24h, depois revalidar no mxtoolbox |
| SSL não ativa | DNS ainda não propagou totalmente | Esperar propagação completa, depois Webflow re-emite |
| Email cai no spam | DMARC mal configurado | Verificar no [dmarcian.com](https://dmarcian.com) |

---

## Links úteis

- [Painel Hostinger](https://hpanel.hostinger.com)
- [Webflow — Connect Custom Domain](https://help.webflow.com/hc/en-us/articles/33961225156627)
- [MXToolbox (verificar DNS/email)](https://mxtoolbox.com)
- [What's My DNS](https://www.whatsmydns.net)
