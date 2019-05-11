//
//  SearchListCell.swift
//  LostKitty
//
//  Created by Jason Prasad on 5/10/19.
//  Copyright © 2019 Jason Prasad. All rights reserved.
//

import UIKit

class SearchListCell: UITableViewCell {
  
    @IBOutlet var title: UILabel!
    @IBOutlet  var summary: UILabel!
  
}

extension SearchListCell {
  
  static let reuseIdentifier = "SearchListCell"
  
  static func nib() -> UINib {
    return UINib(nibName: reuseIdentifier, bundle: nil)
  }
  
}
