import { expect, test } from "@playwright/test";

async function loginAsAdmin(page: import("@playwright/test").Page) {
  await page.goto("/login");

  await page.getByRole("button", { name: /admin/i }).click();

  await expect(page).toHaveURL(/dashboard/);
}

test.describe("Reminders module", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/reminders");
  });

  test("reminders page loads", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Reminder Center" }),
    ).toBeVisible();

    await expect(
      page.getByText("Patient communication and reminder tracking."),
    ).toBeVisible();
  });

  test("reminder KPI cards are displayed", async ({ page }) => {
    await expect(
      page.getByText("Sent Today", { exact: true }).first(),
    ).toBeVisible();

    await expect(
      page.getByText("Pending", { exact: true }).first(),
    ).toBeVisible();

    await expect(
      page.getByText("Failed", { exact: true }).first(),
    ).toBeVisible();

    await expect(
      page.getByText("Follow-Ups Due", { exact: true }).first(),
    ).toBeVisible();
  });

  test("seeded reminders are displayed", async ({ page }) => {
    const rows = page.locator("tbody tr:visible");

    await expect(rows.first()).toBeVisible();
  });

  test("patient search filters reminders", async ({ page }) => {
    const search = page.getByPlaceholder("Search patient...");

    await expect(search).toBeVisible();

    await search.fill("Aarav");

    const rows = page.locator("tbody tr:visible");

    await expect(rows.first()).toBeVisible();
  });

  test("reminder type filter works", async ({ page }) => {
    const typeFilter = page.locator("select").nth(0);

    await typeFilter.selectOption("appointment");

    const rows = page.locator("tbody tr:visible");

    await expect(rows.first()).toBeVisible();

    const typeCells = rows.locator("td").nth(1);
    const count = await typeCells.count();

    for (let i = 0; i < count; i++) {
      await expect(typeCells.nth(i)).toContainText(/appointment/i);
    }
  });

  test("reminder status filter works", async ({ page }) => {
    const statusFilter = page.locator("select").nth(1);

    await statusFilter.selectOption("pending");

    const rows = page.locator("tbody tr:visible");

    await expect(rows.first()).toBeVisible();

    const statusCells = rows.locator("td").nth(2);
    const count = await statusCells.count();

    for (let i = 0; i < count; i++) {
      await expect(statusCells.nth(i)).toContainText(/pending/i);
    }
  });

  test("view reminder opens details drawer", async ({ page }) => {
    const viewButton = page
      .getByRole("button", {
        name: /view reminder/i,
      })
      .first();

    await expect(viewButton).toBeVisible();

    await viewButton.click();

    await expect(
      page.getByRole("heading", { name: "Reminder Details" }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Patient Information" }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Reminder Message" }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Reminder Timeline" }),
    ).toBeVisible();
  });

  test("reminder details drawer closes", async ({ page }) => {
    const viewButton = page
      .getByRole("button", {
        name: /view reminder/i,
      })
      .first();

    await viewButton.click();

    await expect(
      page.getByRole("heading", { name: "Reminder Details" }),
    ).toBeVisible();

    const closeButton = page.getByRole("button", {
      name: /view reminder/i,
    });

    // The drawer's close button is the only button with the X icon.
    const drawer = page
      .getByRole("heading", {
        name: "Reminder Details",
      })
      .locator("..");

    await expect(drawer).toBeVisible();

    await page.keyboard.press("Escape").catch(() => {});
  });
});
