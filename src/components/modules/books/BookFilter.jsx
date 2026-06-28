"use client";

import React, { useState } from "react";
import { TextField, Select, ListBox, Button } from "@heroui/react";
import { Magnifier, ChevronDown } from "@gravity-ui/icons";

export default function BooksFilter({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  minFee,
  setMinFee,
  maxFee,
  setMaxFee,
  availability,
  setAvailability,
}) {
  // Mobile Filter Toggle dropdown
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  return (
    <div className="dashboard-card max-w-7xl mx-auto mb-7">
      {/*  MOBILE VIEW HEADER:*/}
      <div className="flex md:hidden items-center gap-3 w-full">
        <div className="flex-1">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground z-10">
              <Magnifier className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search title, author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-9 w-full text-sm"
            />
          </div>
        </div>

        {/* filter toggle description */}
        <Button
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className={`p-5 py-5.5 rounded-xl border transition-all text-sm font-bold flex items-center gap-2 ${
            isOpenMobile
              ? "bg-primary text-white dark:text-gray-900 border-primary"
              : "bg-card border-border text-foreground"
          }`}
        >
          <span className="w-4 h-9 flex items-center justify-center">
            <ChevronDown className="w-4 h-4" />
          </span>
          <span>Filters</span>
        </Button>
      </div>

      {/* CORE FILTER GRID PANEL (Desktop 1-Row & Mobile Expanded Dropdown) */}
      <div
        className={`${isOpenMobile ? "grid mt-4 pt-4 border-t border-border/40" : "hidden"} md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end`}
      >
        {/* Search input (Desktop Only) */}
        <div className="lg:col-span-4 hidden md:block">
          <TextField
            aria-label="Search Books"
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
            className="w-full"
          >
            <span className="text-sm font-bold font-poppins text-foreground uppercase tracking-wider block mb-1.5">
              Search Books
            </span>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground z-10">
                <Magnifier className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search title, author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-9 w-full text-sm"
              />
            </div>
          </TextField>
        </div>

        {/* category filter dropdown */}
        <div className="lg:col-span-3 sm:col-span-1">
          <span className="text-sm font-bold font-poppins text-foreground uppercase tracking-wider block mb-1.5">
            Category
          </span>
          {/*  aria-label added to Select component */}
          <Select
            aria-label="Filter books by category"
            selectedKey={selectedCategory}
            onSelectionChange={(key) => setSelectedCategory(key)}
          >
            <Select.Trigger className="w-full flex items-center justify-between input-field px-3 text-sm font-medium transition-all">
              <Select.Value>
                {selectedCategory === "all"
                  ? "All Categories"
                  : selectedCategory}
              </Select.Value>
              <Select.Indicator>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </Select.Indicator>
            </Select.Trigger>

            <Select.Popover className="bg-card border border-border rounded-2xl shadow-xl mt-1 overflow-hidden z-50">
              {/* aria-label added to ListBox component */}
              <ListBox
                className="p-1 font-urbanist text-foreground"
                aria-label="Category list options"
              >
                {/*  textValue added to ListBox.Item components */}
                <ListBox.Item
                  id="all"
                  textValue="All Categories"
                  className="flex items-center justify-between text-foreground hover:bg-primary hover:text-white dark:hover:text-gray-900 rounded-xl px-3 py-2 text-sm cursor-pointer capitalize"
                >
                  <span>All Categories</span>
                </ListBox.Item>
                <ListBox.Item
                  id="Fiction"
                  textValue="Fiction"
                  className="flex items-center justify-between text-foreground hover:bg-primary hover:text-white dark:hover:text-gray-900 rounded-xl px-3 py-2 text-sm cursor-pointer capitalize"
                >
                  <span>Fiction</span>
                </ListBox.Item>
                <ListBox.Item
                  id="Tech"
                  textValue="Tech"
                  className="flex items-center justify-between text-foreground hover:bg-primary hover:text-white dark:hover:text-gray-900 rounded-xl px-3 py-2 text-sm cursor-pointer capitalize"
                >
                  <span>Tech</span>
                </ListBox.Item>
                <ListBox.Item
                  id="History"
                  textValue="History"
                  className="flex items-center justify-between text-foreground hover:bg-primary hover:text-white dark:hover:text-gray-900 rounded-xl px-3 py-2 text-sm cursor-pointer capitalize"
                >
                  <span>History</span>
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* delivery fee min/ max filter */}
        <div className="lg:col-span-3 sm:col-span-1 grid grid-cols-2 gap-2">
          <div>
            <span className="text-sm font-bold font-poppins text-muted-foreground uppercase tracking-wider block mb-1.5 truncate">
              Min ($)
            </span>
            <input
              type="number"
              placeholder="0"
              value={minFee}
              onChange={(e) => setMinFee(e.target.value)}
              className="input-field w-full text-sm"
            />
          </div>
          <div>
            <span className="text-sm font-bold font-poppins text-muted-foreground uppercase tracking-wider block mb-1.5 truncate">
              Max ($)
            </span>
            <input
              type="number"
              placeholder="500"
              value={maxFee}
              onChange={(e) => setMaxFee(e.target.value)}
              className="input-field w-full text-sm"
            />
          </div>
        </div>

        {/* status filter dropdown */}
        <div className="lg:col-span-2 sm:col-span-2">
          <span className="text-sm font-bold font-poppins text-foreground uppercase tracking-wider block mb-1.5">
            Status
          </span>
          {/* aria-label added to Select component */}
          <Select
            aria-label="Filter books by availability status"
            selectedKey={availability}
            onSelectionChange={(key) => setAvailability(key)}
          >
            <Select.Trigger className="w-full flex items-center justify-between input-field px-3 text-sm font-medium transition-all">
              <Select.Value>
                {availability === "all" ? "All Status" : availability}
              </Select.Value>
              <Select.Indicator>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </Select.Indicator>
            </Select.Trigger>

            <Select.Popover className="bg-card border border-border rounded-2xl shadow-xl mt-1 overflow-hidden z-50">
              {/* aria-label added to ListBox component */}
              <ListBox
                className="p-1 font-urbanist text-foreground"
                aria-label="Availability status options"
              >
                {/*  textValue added to ListBox.Item components */}
                <ListBox.Item
                  id="all"
                  textValue="All Status"
                  className="flex items-center justify-between text-foreground hover:bg-primary hover:text-white dark:hover:text-gray-900 rounded-xl px-3 py-2 text-sm cursor-pointer"
                >
                  <span>All Status</span>
                </ListBox.Item>
                <ListBox.Item
                  id="Available"
                  textValue="Available"
                  className="flex items-center justify-between text-foreground hover:bg-primary hover:text-white dark:hover:text-gray-900 rounded-xl px-3 py-2 text-sm cursor-pointer"
                >
                  <span>Published</span>
                </ListBox.Item>
                <ListBox.Item
                  id="Unavailable"
                  textValue="Checked Out"
                  className="flex items-center justify-between text-foreground hover:bg-primary hover:text-white dark:hover:text-gray-900 rounded-xl px-3 py-2 text-sm cursor-pointer"
                >
                  <span>Checked Out</span>
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
      </div>
    </div>
  );
}
