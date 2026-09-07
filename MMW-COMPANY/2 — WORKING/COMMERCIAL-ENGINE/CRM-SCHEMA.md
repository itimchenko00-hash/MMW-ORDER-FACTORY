# CRM SCHEMA

One row per lead.

## Required fields
- Lead ID
- Date added
- Contact name
- Company
- Role
- Country / city
- Segment: entrepreneur / investor / landowner / operator / existing business
- Sector
- Need
- Relevant MMW offer
- Relevant project
- Source
- Stage
- Next action
- Next action date
- Estimated deal value
- Probability
- Owner
- Last contact
- Notes

## Pipeline stages
NEW → CONTACTED → REPLIED → QUALIFICATION → AUDIT OFFERED → AUDIT PAID → PROPOSAL → NEGOTIATION → WON → DELIVERY → EXPANSION / PARTNERSHIP → LOST

## Control rules
Every active lead has exactly one next action and date. No lead remains active without a next action. Lost leads retain reason codes for learning.
