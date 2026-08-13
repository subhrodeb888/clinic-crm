"use client";

import { Patient } from "@/types/patient";

import { useMemo } from "react";

import { useForm, useFieldArray, useWatch } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

import { PaymentMethodSelect } from "./payment-method-select";
import { InvoiceItemRow } from "./invoice-item-row";
import { InvoiceSummary } from "./invoice-summary";

import {
  calculateSubtotal,
  calculateTaxAmount,
  calculateGrandTotal,
} from "../utils/invoice-calculations";

import {
  invoiceSchema,
  type InvoiceFormValues,
} from "@/validations/invoice.schema";

import { createInvoice } from "@/actions/billing/create-invoice";

type InvoiceFormProps = {
  patients: Patient[];

  initialPatientId?: string;

  onSuccess: () => void;
};

export function InvoiceForm({
  patients,
  initialPatientId,
  onSuccess,
}: InvoiceFormProps) {
  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),

    defaultValues: {
      patientId: initialPatientId ?? "",

      paymentMethod: "cash",

      discount: 0,

      taxRate: 18,

      items: [
        {
          name: "",

          quantity: 1,

          price: 0,
        },
      ],
    },
  });

  const {
    register,

    watch,

    setValue,

    handleSubmit,

    control,
  } = form;

  const {
    fields,

    append,

    remove,
  } = useFieldArray({
    control,

    name: "items",
  });

  const items = useWatch({
    control,
    name: "items",
  });

  const discount =
    useWatch({
      control,
      name: "discount",
    }) ?? 0;

  const taxRate =
    useWatch({
      control,
      name: "taxRate",
    }) ?? 0;

  const subtotal = useMemo(() => {
    return calculateSubtotal(items || []);
  }, [items]);

  const tax = useMemo(() => {
    return calculateTaxAmount(subtotal, discount, taxRate);
  }, [subtotal, discount, taxRate]);

  const total = useMemo(() => {
    return calculateGrandTotal(subtotal, discount, taxRate);
  }, [subtotal, discount, taxRate]);

  async function onSubmit(data: InvoiceFormValues) {
    console.log("SUBMIT DATA:", data);

    try {
      await createInvoice(data);

      onSuccess();
    } catch (error) {
      console.error("Failed to create invoice", error);
    }
  }

  console.log("ITEMS:", items);
  console.log("SUBTOTAL:", subtotal);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* BASIC INFO */}
      <Card>
        <h3
          className="
            mb-4 text-lg
            font-semibold
          "
        >
          Invoice Information
        </h3>

        <div
          className="
            grid gap-4
            md:grid-cols-2
          "
        >
          {/* PATIENT */}

          <div>
            <p className="mb-2 label-text">Patient ID</p>

            <Select {...register("patientId")}>
              <option value="">Select patient</option>

              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.firstName} {patient.lastName}
                </option>
              ))}
            </Select>
          </div>

          {/* PAYMENT METHOD */}

          <PaymentMethodSelect
            value={watch("paymentMethod")}
            onChange={(value) => setValue("paymentMethod", value)}
          />
        </div>
      </Card>
      {/* SERVICE ITEMS */}
      <Card>
        <div
          className="
            mb-4 flex items-center
            justify-between
          "
        >
          <h3
            className="
              text-lg font-semibold
            "
          >
            Service Items
          </h3>

          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              append({
                name: "",

                quantity: 1,

                price: 0,
              })
            }
          >
            Add Item
          </Button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => {
            const rowTotal =
              (items?.[index]?.quantity || 0) * (items?.[index]?.price || 0);

            return (
              <InvoiceItemRow
                key={field.id}
                index={index}
                register={register}
                total={rowTotal}
                onRemove={() => remove(index)}
              />
            );
          })}
        </div>
      </Card>
      {/* BILLING SETTINGS */}
      <Card>
        <h3
          className="
            mb-4 text-lg
            font-semibold
          "
        >
          Billing Settings
        </h3>

        <div
          className="
            grid gap-4
            md:grid-cols-2
          "
        >
          <div>
            <p className="mb-2 label-text">Discount</p>

            <Input
              type="number"
              min={0}
              {...register("discount", {
                valueAsNumber: true,
              })}
            />
          </div>

          <div>
            <p className="mb-2 label-text">Tax %</p>

            <Input
              type="number"
              min={0}
              {...register("taxRate", {
                valueAsNumber: true,
              })}
            />
          </div>
        </div>
      </Card>
      {/* SUMMARY */}

      <InvoiceSummary
        subtotal={subtotal}
        discount={discount}
        tax={tax}
        total={total}
      />
      {/* ACTIONS */}
      <div
        className="
          flex justify-end gap-3
        "
      >
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>

        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}
