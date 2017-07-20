package com.ds.kindle.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ds.kindle.service.BookService;

@Controller
@RequestMapping("book")
public class BookController {

	@Autowired
	BookService bookService;
	
}
