"use client";

import React from "react";
import { TextField, InputGroup, Select, ListBox } from "@heroui/react";
import { Magnifier, ChevronDown } from "@gravity-ui/icons";

export default function BooksFilter({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="dashboard-card max-w-7xl mx-auto mb-7">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
        {/* . সার্চ ইনপুট ফিল্ড (স্প্যান ৭ কলাম) */}
        <div className="md:col-span-7">
          <TextField
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
            className="w-full"
          >
            <span className="text-sm font-semibold font-poppins text-foreground block mb-2">
              Search Books
            </span>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground z-10">
                <Magnifier className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search by title, author, description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10 w-full"
              />
            </div>
          </TextField>
        </div>

        {/*  ক্যাটাগরি ফিল্টার ড্রপডাউন  */}
        <div className="md:col-span-5 ">
          <span className="text-sm font-semibold font-poppins text-foreground block mb-2">
            Category
          </span>
          <Select
            selectedKey={selectedCategory}
            onSelectionChange={(key) => setSelectedCategory(key)}
          >
            <Select.Trigger className="w-full flex items-center justify-between input-field px-4 text-sm font-medium transition-all">
              <Select.Value>
                {selectedCategory === "all"
                  ? "All Categories"
                  : selectedCategory}
              </Select.Value>
              <Select.Indicator>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </Select.Indicator>
            </Select.Trigger>

            {/* গ্লোবাল কার্ডের ব্যাকগ্রাউন্ড */}
            <Select.Popover className="bg-card border border-border rounded-2xl shadow-xl mt-1 overflow-hidden z-50">
              <ListBox className="p-1 font-urbanist text-foreground">
                <ListBox.Item
                  id="all"
                  className="flex items-center justify-between text-foreground hover:bg-primary hover:text-white rounded-xl px-3 py-2.5 text-sm cursor-pointer capitalize"
                >
                  <span>All Categories</span>
                </ListBox.Item>
                <ListBox.Item
                  id="Fiction"
                  className="flex items-center justify-between text-foreground hover:bg-primary hover:text-white rounded-xl px-3 py-2.5 text-sm cursor-pointer capitalize"
                >
                  <span>Fiction</span>
                </ListBox.Item>
                <ListBox.Item
                  id="Tech"
                  className="flex items-center justify-between text-foreground hover:bg-primary hover:text-white rounded-xl px-3 py-2.5 text-sm cursor-pointer capitalize"
                >
                  <span>Tech</span>
                </ListBox.Item>
                <ListBox.Item
                  id="History"
                  className="flex items-center justify-between text-foreground hover:bg-primary hover:text-white rounded-xl px-3 py-2.5 text-sm cursor-pointer capitalize"
                >
                  <span>History</span>
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
      </div>
    </div>
  );
}
