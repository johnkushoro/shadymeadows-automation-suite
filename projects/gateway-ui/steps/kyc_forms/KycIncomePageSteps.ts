import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { expect, Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';

export class KycIncomePageSteps extends BaseKYCSteps {
  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
  }

  /* -------------------- Verification -------------------- */
  /** Verify the Income heading is visible */
  public async verifyIncomeHeading(): Promise<void> {
    await this.assert.assertPageURLContains('page=income');

    await expect(this.heading).toBeVisible({ timeout: 15_000 });
    await expect(this.heading).toHaveText('Income');
  }

  /* -------------------- Main Flow  -------------------- */
  /** Complete the KYC Income section */
  public async completeKYC_Income(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');

    await this.verifyIncomeHeading();
    await this.answerIncomeQuestions();
    await this.action.clickButtonByText('Save & Continue');
  }

  private async answerIncomeQuestions(): Promise<void> {
    await this.answerOtherIncomeSource();
    await this.answerEarner();
    await this.selectIncomeSource();
    await this.fillGrossAnnualIncomeValue();
  }

  /* -------------------- Questions (split into methods) -------------------- */

  private async answerOtherIncomeSource(answer: string = 'Yes'): Promise<void> {
    await this.action.setRadioByQuestion('Do you have any other income source?', answer);
    this.logger.info?.(`✓ Answered other income source: ${answer}`);
  }

  private async answerEarner(answer: string = 'Joint'): Promise<void> {
    const label = 'Earner';

    const questionVisible = (await this.page.getByText(label, { exact: false }).count()) > 0;
    if (!questionVisible) {
      this.logger.info?.('Earner question not present, skipping');
      return;
    }

    await this.action.setRadioByQuestion(label, answer);
    this.logger.info?.(`✓ Answered earner question: ${answer}`);
  }

  private async selectIncomeSource(): Promise<string> {
    const question = 'Income source';

    if (
      !(await this.page
        .getByText(question, { exact: false })
        .count()
        .catch(() => 0))
    )
      return '';

    const selected = await this.action.chooseFromLabeledReactSelectDropdown(question);
    this.logger.info?.(`Selected Income source: ${selected}`);
    return selected;
  }

  private async fillGrossAnnualIncomeValue(): Promise<void> {
    const label = 'Gross annual income';
    const value = '£90,000';

    const fieldVisible = (await this.page.getByText(label, { exact: false }).count()) > 0;
    if (!fieldVisible) {
      this.logger.info?.('Gross annual income, skipping');
      return;
    }

    await this.action.fillInputByLabel(label, value);
    this.logger.info?.(`✓ Filled Gross annual income value: ${value}`);
  }
}