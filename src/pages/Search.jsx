import React from 'react'

export default function Search() {
      
  return (
    <>
    <div className="input-group">
  <div className="form-outline" data-mdb-input-init>
    <input id="search-input" type="search" className="form-control" />
    <label className="form-label" for="form1">Search</label>
  </div>
  <button id="search-button" type="button" className="btn btn-primary">
    <i className="fas fa-search"></i>
  </button>
</div>
    </>
  )
}
