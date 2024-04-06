import { data as mockIngredients } from '../fixtures/ingredients.json';
import { order as mockOrder } from '../fixtures/orderResponse.json';
import { accessToken, refreshToken } from '../fixtures/tokens.json';
import { setCookie } from '../../src/utils/cookie';
describe('Тестирование бургер конструктора', () => {
  beforeEach(() => {
    cy.visit('/');
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'userResponse.json'
    }).as('userAuth');
    cy.wait('@getIngredients');
    cy.wait('@userAuth');
  });
  describe('Открытие и закрытие модального окна', () => {
    beforeEach(() => {
      cy.get('[data-cy="ingredientList"]').find('li').first().click();
      cy.get('[data-cy="modalContent"]')
        .as('modalContent')
        .should('be.visible');
    });
    it('Закрытие по кнопке', () => {
      cy.get('@modalContent').find('button').click();
      cy.get('@modalContent').should('not.exist');
    });
    it('Закрытие по оверлею', () => {
      cy.get('[data-cy="modalOverlay"]').click({ force: true });
      cy.get('@modalContent').should('not.exist');
    });
  });
  describe('Тестирование ингредиентов', () => {
    it('Количество отрендеренных ингредиентов', () => {
      cy.get('[data-cy="ingredientName"]').should(
        'have.length',
        mockIngredients.length
      );
    });
  });
  describe('Тестирование оформления заказа', () => {
    beforeEach(() => {
      cy.get('[data-cy="ingredientList"]')
        .as('ingredientList')
        .contains('Краторная булка')
        .parent()
        .contains('Добавить')
        .click();
      cy.get('@ingredientList')
        .contains('Биокотлета')
        .parent()
        .contains('Добавить')
        .click();
      cy.get('@ingredientList')
        .contains('Spicy-X')
        .parent()
        .contains('Добавить')
        .click();
    });
    it('Добавление ингредиентов в конструктор', () => {
      cy.get('[data-cy="ingredientsBun"]').each((element) => {
        cy.wrap(element).contains('Краторная булка').should('exist');
      });
      cy.get('[data-cy="ingredientFill"]')
        .as('ingredientFill')
        .contains('Биокотлета')
        .should('exist');
      cy.get('@ingredientFill').contains('Spicy-X').should('exist');
    });
    it('Отправка заказа на сервер', () => {
      cy.intercept('POST', 'api/orders', {
        fixture: 'orderResponse.json'
      }).as('getOrder');
      cy.get('[data-cy="sendOrder"]')
        .contains('Оформить')
        .should('be.enabled')
        .click();
      cy.wait('@getOrder');
      cy.get('[data-cy="modalContent"]')
        .as('modalContent')
        .should('be.visible')
        .within(() => {
          cy.get('h2')
            .invoke('text')
            .then((text) => {
              expect(Number(text)).to.equal(mockOrder.number);
            });
          cy.get('button').click();
        });
      cy.get('@modalContent').should('not.exist');
      cy.get('[data-cy="ingredientsBun"], [data-cy="ingredientFill"]').should(
        'not.exist'
      );
    });
  });
});
