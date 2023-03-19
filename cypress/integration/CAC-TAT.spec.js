/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", () => {
    cy.title().should("eq", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", () => {
    cy.get("#firstName").type("Gerson");
    cy.get("#lastName").type("Santos");
    cy.get("#email").type("teste@email.com");
    cy.get("#open-text-area").type("escrevendo um teste", { delay: 0 });
    cy.get('button[type="submit"]').click();

    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#firstName").type("Gerson");
    cy.get("#lastName").type("Santos");
    cy.get("#open-text-area").type("escrevendo um teste", { delay: 0 });
    cy.get('button[type="submit"]').click();

    cy.get(".error").should("be.visible");
  });

  it("validar que campo numero não aceita outros caracteres", () => {
    cy.get("#phone").type("utyhh@##$$$").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("Gerson");
    cy.get("#lastName").type("Santos");
    cy.get("#email").type("teste@email.com");
    cy.get("#open-text-area").type("escrevendo um teste", { delay: 0 });
    cy.get("#phone-checkbox").check();
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("Gerson")
      .should("have.value", "Gerson")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("Santos")
      .should("have.value", "Santos")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("teste@email.com")
      .should("have.value", "teste@email.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("9898989584")
      .should("have.value", "9898989584")
      .clear()
      .should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });

  it("envia o formuário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit();
  });

  it("seleciona um produto (YouTube) por seu texto", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("seleciona um produto (Blog) por seu índice", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get("#support-type")
      .find('input[value="feedback"]')
      .check()
      .should("have.value", "feedback");
  });

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get("#support-type")
      .find('input[type="radio"]')
      .each(($radio) => {
        cy.wrap($radio).check().should("be.checked");
      });
  });

  it("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get("#check")
      .find('input[type="checkbox"]')
      .check()
      .each((checkbox) => {
        cy.get(checkbox).should("be.checked");
      });

    cy.get("#check")
      .find('input[type="checkbox"]')
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it("seleciona um arquivo da pasta fixtures", () => {
    cy.get('input[type="file"]')
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json")
      .should(($input) => {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get('input[type="file"]')
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json", { action: "drag-drop" })
      .should(($input) => {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo simulando um drag-and-drop", () => {
    cy.fixture("example.json").as("samplesFile");
    cy.get('input[type="file"]')
      .selectFile("@samplesFile")
      .should(($input) => {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy').find('a').should('have.attr', 'target', '_blank');
  });

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy').find('a').invoke('removeAttr', 'target').click();
  });

  it('testa a página da política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html');
  })
});
