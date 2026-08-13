import { expect, test } from "@playwright/test";

async function loginAsAdmin(page: import("@playwright/test").Page) {
  await page.goto("/login");

  await page.getByRole("button", { name: /admin/i }).click();

  await expect(page).toHaveURL(/dashboard/);
}

test.describe("Reports module", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/reports");
  });

  test("reports page loads", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Reports & Analytics" }),
    ).toBeVisible();

    await expect(
      page.getByText("Operational reporting and clinic performance insights."),
    ).toBeVisible();
  });

  test("report KPI cards are displayed", async ({ page }) => {
    await expect(
      page.getByText("Total Revenue", { exact: true }),
    ).toBeVisible();

    await expect(
      page.getByRole("main").getByText("Appointments", { exact: true }),
    ).toBeVisible();

    await expect(
      page.getByText("No Show Rate", { exact: true }).first(),
    ).toBeVisible();

    await expect(
      page.getByText("Active Patients", { exact: true }),
    ).toBeVisible();
  });

  test("revenue trends chart is displayed", async ({ page }) => {
    await expect(
      page.getByText("Revenue Trends", { exact: true }),
    ).toBeVisible();

    await expect(
      page.getByText("Monthly revenue performance", { exact: true }),
    ).toBeVisible();
  });

  test("appointment analytics chart is displayed", async ({ page }) => {
    await expect(
      page.getByText("Appointment Analytics", { exact: true }),
    ).toBeVisible();

    await expect(
      page.getByText("Monthly appointment volume", { exact: true }),
    ).toBeVisible();
  });

  test("doctor performance chart is displayed", async ({ page }) => {
    await expect(
      page.getByText("Doctor Performance", { exact: true }),
    ).toBeVisible();

    await expect(
      page.getByText("Consultations completed", { exact: true }),
    ).toBeVisible();
  });

  test("no show rate chart is displayed", async ({ page }) => {
    await expect(
      page.getByText("No Show Rate", { exact: true }).first(),
    ).toBeVisible();

    await expect(
      page.getByText("Attendance overview", { exact: true }),
    ).toBeVisible();
  });

  test("patient growth chart is displayed", async ({ page }) => {
    await expect(
      page.getByText("Patient Growth", { exact: true }),
    ).toBeVisible();

    await expect(
      page.getByText("New patient registrations", { exact: true }),
    ).toBeVisible();
  });

  test("operational insights are displayed", async ({ page }) => {
    await expect(
      page.getByText("Operational Insights", { exact: true }),
    ).toBeVisible();

    await expect(
      page.getByText("Revenue Growth", { exact: true }),
    ).toBeVisible();

    await expect(
      page.getByText("Appointment Growth", { exact: true }),
    ).toBeVisible();

    await expect(
      page.getByText("No Show Improvement", { exact: true }),
    ).toBeVisible();

    await expect(
      page.getByText("Top Performing Doctor", { exact: true }),
    ).toBeVisible();
  });
});
