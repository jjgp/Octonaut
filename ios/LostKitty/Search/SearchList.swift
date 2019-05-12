//
//  SearchList.swift
//  LostKitty
//
//  Created by Jason Prasad on 5/9/19.
//  Copyright © 2019 Jason Prasad. All rights reserved.
//

import UIKit



@objc(SearchList)
class SearchList: UITableView {
  
  @objc var hasMore = false
  @objc var onDidSelect: RCTDirectEventBlock?
  @objc var onEndReached: RCTDirectEventBlock?
  @objc var onRefresh: RCTDirectEventBlock?
  @objc var primaryColor: String?
  @objc var secondaryColor: String?
  private var models = [SearchListCellModel]() {
    didSet {
      reloadData()
    }
  }
  
  override init(frame: CGRect, style: UITableView.Style) {
    super.init(frame: frame, style: style)
    estimatedRowHeight = 75
    dataSource = self
    delegate = self
    refreshControl = UIRefreshControl()
    refreshControl?.addTarget(self,
                              action: #selector(refreshValueChanged),
                              for: .valueChanged)
    register(SearchListCell.nib(), forCellReuseIdentifier: SearchListCell.reuseIdentifier)
    rowHeight = UITableView.automaticDimension
    tableFooterView = UIView(frame: .zero)
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
}

extension SearchList {
  
  func endRefreshing() {
    refreshControl?.endRefreshing()
  }
  
  @objc func setResults(_ results: [Any]?) {
    guard let models = JSON(results)?.arrayOfJSON?.compactMap({ SearchListCellModel(json: $0) }) else {
      return
    }
    self.models = models
  }
  
}

extension SearchList {
  
  @objc func refreshValueChanged() {
    onRefresh?([:])
  }
  
}

extension SearchList: UITableViewDataSource {
  
  func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return models.count
  }
  
  func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: SearchListCell.reuseIdentifier) as! SearchListCell
    if let primaryColor = primaryColor.flatMap({ UIColor(hex: $0) }) {
      cell.primaryColor = primaryColor
    }
    if let secondaryColor = secondaryColor.flatMap({ UIColor(hex: $0) }) {
      cell.secondaryColor = secondaryColor
    }
    cell.setModel(models[indexPath.row])
    return cell
  }
  
}

extension SearchList: UITableViewDelegate {
  
  func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    defer { tableView.deselectRow(at: indexPath, animated: true) }
    let row = indexPath.row
    onDidSelect?([
      "id": models[indexPath.row].id ?? "",
      "row": row
      ])
  }
  
  func tableView(_ tableView: UITableView, willDisplay cell: UITableViewCell, forRowAt indexPath: IndexPath) {
    if indexPath.row == tableView.numberOfRows(inSection: 0) - 1 {
      if hasMore {
        onEndReached?([:])
        let activityIndicator = UIActivityIndicatorView(frame: CGRect(x: 0, y: 0, width: bounds.width, height: 44))
        activityIndicator.style = .gray
        activityIndicator.startAnimating()
        tableFooterView = activityIndicator
        tableFooterView?.isHidden = false
      } else {
        tableFooterView = nil
      }
    }
  }
  
}
