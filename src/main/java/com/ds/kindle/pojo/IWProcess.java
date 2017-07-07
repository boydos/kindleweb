package com.ds.kindle.pojo;

import java.util.concurrent.atomic.AtomicInteger;

public class IWProcess {
	private int count;
	private AtomicInteger process= new AtomicInteger(0);
	public IWProcess(int count) {
		this.count = count;
	}
	public int getCount() {
		return count;
	}
	public int getProcess() {
		return process.get();
	}
	public int increase() {
		return process.incrementAndGet();
	}
}
